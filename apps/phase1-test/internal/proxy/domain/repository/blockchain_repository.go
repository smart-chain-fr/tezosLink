package repository

import (
	pkgmodel "github.com/smart-chain-fr/tezosLink/backend/pkg/domain/model"
)

// BlockchainRepository contains all available methods of a blockchain repository
type BlockchainRepository interface {
	Get(request *pkgmodel.Request, url string) (interface{}, error)
	Add(request *pkgmodel.Request, response interface{}) error
}
