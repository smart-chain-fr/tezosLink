package cache

import (
	"fmt"
	"log"

	lru "github.com/hashicorp/golang-lru"
	"github.com/smart-chain-fr/tezosLink/backend/config"
	"github.com/smart-chain-fr/tezosLink/backend/internal/proxy/domain/repository"
	pkgmodel "github.com/smart-chain-fr/tezosLink/backend/pkg/domain/model"
)

type cacheBlockchainRepository struct {
	cache *lru.Cache
}

// NewCacheBlockchainRepository returns a new blockchain LRU cache repository
func NewCacheBlockchainRepository() repository.BlockchainRepository {
	cache, err := lru.New(config.ProxyConfig.Proxy.BlockchainRequestsCacheMaxItems)
	if err != nil {
		log.Fatal("could not init the LRU cache")
	}

	return &cacheBlockchainRepository{
		cache: cache,
	}
}

func (l cacheBlockchainRepository) Get(request *pkgmodel.Request, url string) (interface{}, error) {
	val, ok := l.cache.Get(request.Path)
	if !ok {
		return nil, fmt.Errorf("could not get cache for path: %s", request.Path)
	}

	return val, nil
}

func (l cacheBlockchainRepository) Add(request *pkgmodel.Request, response interface{}) error {
	l.cache.Add(request.Path, response)

	return nil
}
