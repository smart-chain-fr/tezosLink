package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strconv"
	"time"

	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
	"github.com/smart-chain-fr/tezosLink/backend/config"
	"github.com/smart-chain-fr/tezosLink/backend/internal/proxy/infrastructure/cache"
	"github.com/smart-chain-fr/tezosLink/backend/internal/proxy/infrastructure/database"
	httpinfra "github.com/smart-chain-fr/tezosLink/backend/internal/proxy/infrastructure/http"
	"github.com/smart-chain-fr/tezosLink/backend/internal/proxy/infrastructure/proxy"
	"github.com/smart-chain-fr/tezosLink/backend/internal/proxy/usecases"
	pkgcache "github.com/smart-chain-fr/tezosLink/backend/pkg/infrastructure/cache"
	pkgdatabase "github.com/smart-chain-fr/tezosLink/backend/pkg/infrastructure/database"
	"github.com/sirupsen/logrus"
)

var configPath = flag.String("conf", "", "Path to TOML config")

// Always run
func init() {
	flag.Parse()

	if *configPath == "" {
		log.Fatal("Program argument --conf is required")
	} else {
		_, err := config.ParseProxyConf(*configPath)
		if err != nil {
			log.Fatalf("Could not load config from %s. Reason: %s", *configPath, err)
		}
	}

	database.Configure()
}

func writeCachedRequestsRoutine(p *usecases.ProxyUsecase) {
	for true {
		p.WriteCachedRequestsRoutine()
	}
}

func main() {
	archiveReverseURL, err := url.Parse("http://" + config.ProxyConfig.Tezos.ArchiveHost + ":" + strconv.Itoa(config.ProxyConfig.Tezos.ArchivePort))
	if err != nil {
		log.Fatal(fmt.Sprintf("could not read blockchain node reverse url from configuration: %s", err))
	}
	logrus.Info("proxying requests to archive node: ", archiveReverseURL)
	archiveReverseProxy := httputil.NewSingleHostReverseProxy(archiveReverseURL)

	rollingReverseURL, err := url.Parse("http://" + config.ProxyConfig.Tezos.RollingHost + ":" + strconv.Itoa(config.ProxyConfig.Tezos.RollingPort))
	if err != nil {
		log.Fatal(fmt.Sprintf("could not read blockchain node reverse url from configuration: %s", err))
	}
	logrus.Info("proxying requests to rolling node: ", rollingReverseURL)
	rollingReverseProxy := httputil.NewSingleHostReverseProxy(rollingReverseURL)

	// Repositories
	cacheBlockchainRepo := cache.NewCacheBlockchainRepository()
	proxyRepo := proxy.NewProxyBlockchainRepository()
	projectRepo := pkgdatabase.NewPostgresProjectRepository(database.Connection)
	cacheProjectRepo := pkgcache.NewLRUProjectRepository()
	metricsRepo := pkgdatabase.NewPostgresMetricsRepository(database.Connection)
	cacheMetricsRepo := cache.NewCacheMetricsRepository()

	// Use cases
	proxyUsecase := usecases.NewProxyUsecase(cacheBlockchainRepo, proxyRepo, metricsRepo, projectRepo, cacheProjectRepo, cacheMetricsRepo)

	// Routine
	go writeCachedRequestsRoutine(proxyUsecase)

	// HTTP API
	server := http.Server{
		Addr:         ":" + strconv.Itoa(config.ProxyConfig.Server.Port),
		ReadTimeout:  time.Duration(config.ProxyConfig.Proxy.ReadTimeout) * time.Second,
		WriteTimeout: time.Duration(config.ProxyConfig.Proxy.WriteTimeout) * time.Second,
		IdleTimeout:  time.Duration(config.ProxyConfig.Proxy.IdleTimeout) * time.Second,
	}
	httpController := httpinfra.NewHTTPController(proxyUsecase, archiveReverseProxy, rollingReverseProxy, &server)
	httpController.Initialize()
	httpController.Run()
}
