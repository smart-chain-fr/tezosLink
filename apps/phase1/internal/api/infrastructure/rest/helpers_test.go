package rest

import (
	"github.com/go-chi/chi"
	"github.com/smart-chain-fr/tezosLink/backend/internal/api/domain/model"
	pkgmodel "github.com/smart-chain-fr/tezosLink/backend/pkg/domain/model"
	"github.com/stretchr/testify/mock"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

type mockProjectUsecase struct {
	mock.Mock
}

func (m *mockProjectUsecase) CreateProject(name string, network string) (*pkgmodel.Project, error) {
	args := m.Called(name, network)
	if args.Get(0) != nil {
		return args.Get(0).(*pkgmodel.Project), args.Error(1)
	}
	return nil, args.Error(1)
}

func (m *mockProjectUsecase) FindProjectAndMetrics(uuid string, from time.Time, to time.Time) (*pkgmodel.Project, *pkgmodel.Metrics, error) {
	args := m.Called(uuid, from, to)

	project := args.Get(0).(*pkgmodel.Project)
	metrics := args.Get(1).(*pkgmodel.Metrics)
	err := args.Error(2)

	return project, metrics, err
}

type mockHealthUsecase struct {
	mock.Mock
}

func (m *mockHealthUsecase) Health() *model.Health {
	args := m.Called()
	return args.Get(0).(*model.Health)
}

func withRouter(router *chi.Mux, f func(t *testing.T, router *chi.Mux)) func(t *testing.T) {
	return func(t *testing.T) {
		f(t, router)
	}
}

func executeRequest(req *http.Request, handler *chi.Mux) *httptest.ResponseRecorder {
	// We create a ResponseRecorder (which satisfies http.ResponseWriter) to record the response.
	rr := httptest.NewRecorder()

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	return rr
}

func buildControllerWithProjectUseCaseError(project *pkgmodel.Project, error error, ucMethod string) *Controller {
	mockHealthUsecase := &mockHealthUsecase{}
	mockProjectUsecase := &mockProjectUsecase{}
	mockProjectUsecase.
		On(ucMethod, mock.Anything, mock.Anything).
		Return(project, error).
		Twice()
	rcc := NewRestController(chi.NewRouter(), mockProjectUsecase, mockHealthUsecase)
	rcc.Initialize()

	return rcc
}

func buildControllerWitHealthUseCaseReturning(health *model.Health, ucMethod string) *Controller {
	mockProjectUsecase := &mockProjectUsecase{}
	mockHealthUsecase := &mockHealthUsecase{}
	mockHealthUsecase.
		On(ucMethod, mock.Anything).
		Return(health).
		Twice()
	rcc := NewRestController(chi.NewRouter(), mockProjectUsecase, mockHealthUsecase)
	rcc.Initialize()

	return rcc
}

func getStringWithoutNewLine(toAssert string) string {
	return strings.TrimSuffix(toAssert, "\n")
}
