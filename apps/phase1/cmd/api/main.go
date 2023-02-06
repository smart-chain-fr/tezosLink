package main

import (
	"flag"
	"github.com/go-chi/chi"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
	"github.com/smart-chain-fr/tezosLink/backend/config"
	"github.com/smart-chain-fr/tezosLink/backend/internal/api/infrastructure/database"
	"github.com/smart-chain-fr/tezosLink/backend/internal/api/infrastructure/rest"
	"github.com/smart-chain-fr/tezosLink/backend/internal/api/usecases"
	pkgdatabase "github.com/smart-chain-fr/tezosLink/backend/pkg/infrastructure/database"
	"log"
	"strings"
)

var configPath = flag.String("conf", "", "Path to TOML config")

// Always run
func init() {
	flag.Parse()

	if *configPath == "" {
		log.Fatal("Program argument --conf is required")
	} else {
		_, err := config.ParseAPIConf(*configPath)
		if err != nil {
			log.Fatalf("Could not load config from %s. Reason: %s", *configPath, err)
		}
	}

	database.Configure()
}

func main() {
	router := chi.NewRouter()
	runMigrations()

	// Repositories
	projectRepo := pkgdatabase.NewPostgresProjectRepository(database.Connection)
	metricsRepo := pkgdatabase.NewPostgresMetricsRepository(database.Connection)

	// Use cases
	projectUsecase := usecases.NewProjectUsecase(projectRepo, metricsRepo)
	healthUsecase := usecases.NewHealthUsecase(projectRepo)

	// HTTP API
	restController := rest.NewRestController(router, projectUsecase, healthUsecase)
	restController.Initialize()
	restController.Run(config.APIConfig.Server.Port)
}

func runMigrations() {
	m, err := migrate.New(
		config.APIConfig.Migration.Path,
		config.APIConfig.Database.Url)
	if err != nil {
		log.Fatal("Could not apply db migration: ", err)
	}
	if err := m.Up(); err != nil {
		if !strings.Contains(err.Error(), "no change") {
			log.Fatal("Could not apply db migration: ", err)
		}
	}
}
