package repository

import (
	"github.com/smart-chain-fr/tezosLink/backend/pkg/infrastructure/database/inputs"
)

// MetricInputRepository contains all available methods of a blockchain repository
type MetricInputRepository interface {
	Add(metric *inputs.MetricsInput) error
	GetAll() ([]*inputs.MetricsInput, error)
	Len() int
}
