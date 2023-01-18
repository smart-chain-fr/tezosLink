package repository

import (
	"github.com/smart-chain-fr/tezosLink/backend/pkg/domain/model"
	"github.com/smart-chain-fr/tezosLink/backend/pkg/infrastructure/database/inputs"
	"time"
)

// MetricsRepository contains all available methods of the metrics repository
type MetricsRepository interface {
	SaveMany(metricInputs []*inputs.MetricsInput) error
	Save(metricInput *inputs.MetricsInput) error
	CountAll(uuid string) (int, error)
	FindRequestsByDay(uuid string, from time.Time, to time.Time) ([]*model.RequestsByDayMetrics, error)
	CountRPCPathUsage(uuid string, from time.Time, to time.Time) ([]*model.RPCUsageMetrics, error)
	FindLastRequests(uuid string) ([]string, error)
	RemoveThreeMonthsOldMetrics() error
}
