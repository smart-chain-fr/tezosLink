package usecases

import (
	"encoding/json"
	"errors"
	"github.com/smart-chain-fr/tezosLink/backend/internal/proxy/domain/model"
	"io/ioutil"
	"net/http"
	"regexp"
	"strings"
	"testing"
	"time"

	"github.com/bmizerany/assert"
	"github.com/smart-chain-fr/tezosLink/backend/config"
	"github.com/smart-chain-fr/tezosLink/backend/internal/api/infrastructure/rest/inputs"
	"github.com/smart-chain-fr/tezosLink/backend/internal/api/infrastructure/rest/outputs"
	pkgmodel "github.com/smart-chain-fr/tezosLink/backend/pkg/domain/model"
	dbinputs "github.com/smart-chain-fr/tezosLink/backend/pkg/infrastructure/database/inputs"
	"github.com/stretchr/testify/mock"
)

type dummyResponse struct {
	expResp                 string
	expToRawProxy           bool
	expErr                  error
	cacheErr                error
	proxyErr                error
	metricErr               error
	projectErr              error
	projectCacheFindErr     error
	projectCacheSaveErr     error
	projectDatabaseResponse *pkgmodel.Project
	projectCacheResponse    *pkgmodel.Project
	expNodeType             model.NodeType
}

func newDummyResponse() dummyResponse {
	return dummyResponse{
		expResp:                 "",
		expToRawProxy:           false,
		expErr:                  nil,
		cacheErr:                nil,
		proxyErr:                nil,
		metricErr:               nil,
		projectErr:              nil,
		projectCacheFindErr:     nil,
		projectCacheSaveErr:     nil,
		projectDatabaseResponse: nil,
		projectCacheResponse:    nil,
		expNodeType:             model.NodeTypeUnknown,
	}
}

func TestProxyUsecase_Proxy_Unit(t *testing.T) {
	_, err := config.ParseProxyConf("../../../test/proxy/conf/test.toml")
	if err != nil {
		t.Fatal("could not parse conf", err)
	}
	prj := pkgmodel.NewProject(123, "DUMMY_TITLE", "DUMMY_UUID", time.Now(), "MAINNET")
	prjTestnet := pkgmodel.NewProject(124, "DUMMY_TITLE_TESTNET", "DUMMY_UUID_TESTNET", time.Now(), "CARTHAGENET")
	localURL := "127.0.0.1"

	projectNotFound := errors.New("project not found")

	blockedRequest := pkgmodel.NewRequest("/dummy/path", "UUID", pkgmodel.OBTAIN, localURL)
	expResponse := newDummyResponse()
	expResponse.expResp = "call blacklisted"
	expResponse.projectDatabaseResponse = &prj
	expResponse.projectCacheResponse = &prj
	t.Run("Returns blacklisted When there is a blacklisted path",
		testProxyUsecaseFunc(&blockedRequest, &expResponse))

	postRequest := pkgmodel.NewRequest("/chains/main/blocks/head", "UUID", pkgmodel.PUSH, localURL)
	expResponse = newDummyResponse()
	expResponse.expToRawProxy = true
	expResponse.projectDatabaseResponse = &prj
	expResponse.projectCacheResponse = &prj
	expResponse.expNodeType = model.RollingNode
	t.Run("Forward to reverse proxy When there is a PUSH request",
		testProxyUsecaseFunc(&postRequest, &expResponse))

	whitelistedCachedRequest := pkgmodel.NewRequest("/chains/main/blocks/number", "UUID", pkgmodel.OBTAIN, localURL)
	expResponse = newDummyResponse()
	expResponse.expResp = "Dummy cache response"
	expResponse.projectDatabaseResponse = &prj
	expResponse.projectCacheResponse = &prj
	t.Run("Returns the cached response When there is a whitelisted path",
		testProxyUsecaseFunc(&whitelistedCachedRequest, &expResponse))

	expResponse = newDummyResponse()
	expResponse.expResp = "Dummy proxy response"
	expResponse.cacheErr = errors.New("no cache available")
	expResponse.projectDatabaseResponse = &prj
	expResponse.projectCacheResponse = &prj
	t.Run("Returns the proxy response When there is no cached response",
		testProxyUsecaseFunc(&whitelistedCachedRequest, &expResponse))

	expResponse = newDummyResponse()
	expResponse.expResp = "project not found"
	expResponse.expErr = projectNotFound
	expResponse.cacheErr = errors.New("no cache available")
	expResponse.projectErr = projectNotFound
	expResponse.projectCacheFindErr = projectNotFound
	t.Run("Returns no project found error When it is not in the cache or database",
		testProxyUsecaseFunc(&whitelistedCachedRequest, &expResponse))

	expResponse = newDummyResponse()
	expResponse.expResp = "Dummy proxy response"
	expResponse.cacheErr = errors.New("no cache available")
	expResponse.projectCacheFindErr = projectNotFound
	expResponse.projectDatabaseResponse = &prj
	expResponse.projectCacheResponse = &prj
	t.Run("Returns project When it is not in the cache but found in database",
		testProxyUsecaseFunc(&whitelistedCachedRequest, &expResponse))

	whitelistedNotCachedRequest := pkgmodel.NewRequest("/chains/main/blocks", "UUID", pkgmodel.OBTAIN, localURL)
	expResponse = newDummyResponse()
	expResponse.expToRawProxy = true
	expResponse.projectDatabaseResponse = &prj
	expResponse.projectCacheResponse = &prj
	expResponse.expNodeType = model.ArchiveNode
	t.Run("Returns the proxy response When the path is not cacheable",
		testProxyUsecaseFunc(&whitelistedNotCachedRequest, &expResponse))

	whitelistedCacheableNotCachedRequest := pkgmodel.NewRequest("/chains/main/blocks/number", "UUID", pkgmodel.OBTAIN, localURL)
	expResponse = newDummyResponse()
	expResponse.expResp = "no response from proxy"
	expResponse.expErr = errors.New("no response from proxy")
	expResponse.cacheErr = errors.New("no cache available")
	expResponse.proxyErr = errors.New("proxy error")
	expResponse.projectDatabaseResponse = &prj
	expResponse.projectCacheResponse = &prj
	t.Run("Returns no response When there is no cache and an proxy error",
		testProxyUsecaseFunc(&whitelistedCacheableNotCachedRequest, &expResponse))

	redirectionRequest := pkgmodel.NewRequest("/chains/main/blocks/head", "UUID", pkgmodel.OBTAIN, localURL)
	expResponse = newDummyResponse()
	expResponse.expToRawProxy = true
	expResponse.expResp = ""
	expResponse.cacheErr = errors.New("no cache available")
	expResponse.projectDatabaseResponse = &prj
	expResponse.projectCacheResponse = &prj
	expResponse.expNodeType = model.RollingNode
	t.Run("Returns a redirection response When the URL is meant to be redirected",
		testProxyUsecaseFunc(&redirectionRequest, &expResponse))

	networkInvalidRequest := pkgmodel.NewRequest("/chains/main/blocks/head", "UUID", pkgmodel.OBTAIN, localURL)
	expResponse = newDummyResponse()
	expResponse.expResp = "invalid network"
	expResponse.cacheErr = errors.New("no cache available")
	expResponse.projectCacheResponse = &prjTestnet
	t.Run("Returns invalid network error When project network dos not match proxy network",
		testProxyUsecaseFunc(&networkInvalidRequest, &expResponse))
}

func testProxyUsecaseFunc(req *pkgmodel.Request, resp *dummyResponse) func(t *testing.T) {
	return func(t *testing.T) {
		// Given
		mockBlockchainCacheRepo := stubBlockchainCacheRepository([]byte("Dummy cache response"), resp.cacheErr)
		mockBlockchainRepo := stubBlockchainRepository([]byte("Dummy proxy response"), resp.proxyErr)
		mockMetricsRepo := stubMetricsRepository(resp.metricErr)
		mockProjectRepo := stubProjectRepository(resp.projectDatabaseResponse, resp.projectErr)
		mockProjectCacheRepo := stubProjectCacheRepository(resp.projectCacheResponse, resp.projectCacheFindErr, resp.projectCacheSaveErr)
		mockCacheMetricsRepo := stubCacheMetricsRepository(nil)

		puc := NewProxyUsecase(mockBlockchainCacheRepo, mockBlockchainRepo, mockMetricsRepo, mockProjectRepo, mockProjectCacheRepo, mockCacheMetricsRepo)

		// When
		proxyResp, toRawProxy, nodeURL, err := puc.Proxy(req)

		// Then
		assert.Equal(t, resp.expResp, proxyResp, "Bad response")
		assert.Equal(t, resp.expToRawProxy, toRawProxy, "Bad boolean value")
		assert.Equal(t, resp.expErr, err, "Bad error")
		assert.Equal(t, resp.expNodeType, nodeURL, "Bad node type")
	}
}

func stubBlockchainRepository(response interface{}, error error) *mockBlockchainRepository {
	mockBlockchainRepository := &mockBlockchainRepository{}
	mockBlockchainRepository.
		On("Get", mock.Anything, mock.Anything).
		Return(response, error).
		Once()
	mockBlockchainRepository.
		On("Add", mock.Anything, mock.Anything).
		Return(error).
		Once()
	return mockBlockchainRepository
}

func stubBlockchainCacheRepository(response interface{}, error error) *mockBlockchainRepository {
	mockBlockchainRepository := &mockBlockchainRepository{}
	mockBlockchainRepository.
		On("Get", mock.Anything, mock.Anything).
		Return(response, error).
		Once()
	mockBlockchainRepository.
		On("Add", mock.Anything, mock.Anything).
		Return(error).
		Once()
	return mockBlockchainRepository
}

func stubProjectRepository(response *pkgmodel.Project, error error) *mockProjectRepository {
	mockProjectRepository := &mockProjectRepository{}
	mockProjectRepository.
		On("FindByUUID", mock.Anything).
		Return(response, error).
		Once()
	mockProjectRepository.
		On("Save", mock.Anything, mock.Anything, mock.Anything, mock.Anything).
		Return(response, error).
		Once()
	return mockProjectRepository
}

func stubProjectCacheRepository(response *pkgmodel.Project, errorFind error, errorSave error) *mockProjectRepository {
	mockProjectRepository := &mockProjectRepository{}
	mockProjectRepository.
		On("FindByUUID", mock.Anything).
		Return(response, errorFind).
		Once()
	mockProjectRepository.
		On("Save", mock.Anything, mock.Anything, mock.Anything, mock.Anything).
		Return(response, errorSave).
		Once()
	return mockProjectRepository
}

// Need docker-compose running in background
func TestProxyUsecase_Proxy_RedirectToMockServer_Integration(t *testing.T) {
	client := &http.Client{}
	newProject, _ := json.Marshal(inputs.NewProject{
		Title:   "New Project",
		Network: "MAINNET",
	})

	// 0. Create a project
	req, err := http.NewRequest("POST", "http://0.0.0.0:8000/api/v1/projects", strings.NewReader(string(newProject)))
	if err != nil {
		t.Fatal(err)
	}

	r, err := client.Do(req)
	if err != nil {
		t.Fatal(err)
	}
	_ = r.Body.Close()

	url, _ := r.Location()
	path := url.Path

	var uuidRegex = `(?m)([0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12})`
	re := regexp.MustCompile(uuidRegex)
	var uuid string
	for _, match := range re.FindAllString(path, -1) {
		uuid = match
	}

	// 1. Send a dummy request
	req, err = http.NewRequest("PUT", "http://0.0.0.0:8001/v1/"+uuid+"/mockserver/status", nil)
	if err != nil {
		t.Fatal(err)
	}

	r, err = client.Do(req)
	if err != nil {
		t.Fatal(err)
	}

	var b []byte
	b, err = ioutil.ReadAll(r.Body)
	if err != nil {
		t.Fatal(err)
	}
	_ = r.Body.Close()

	assert.Equal(t, string(b), `{
  "ports" : [ 1090 ],
  "version" : "5.9.0",
  "artifactId" : "mockserver-core",
  "groupId" : "org.mock-server"
}`)

	// 2. Wait for Go routine
	time.Sleep(65 * time.Second)

	// 3. Get the number of request done by this project UUID
	req, err = http.NewRequest("GET", "http://0.0.0.0:8000/api/v1/projects/"+uuid, nil)
	if err != nil {
		t.Fatal(err)
	}

	r, err = client.Do(req)
	if err != nil {
		t.Fatal(err)
	}

	b, err = ioutil.ReadAll(r.Body)
	if err != nil {
		t.Fatal(err)
	}
	_ = r.Body.Close()

	type HTTPOutput struct {
		Data   outputs.ProjectOutputWithMetrics `json:"data"`
		Status string                           `json:"status"`
	}
	var projectOutputWithMetrics HTTPOutput
	err = json.Unmarshal(b, &projectOutputWithMetrics)
	if err != nil {
		t.Fatal(err)
	}

	now := time.Now().UTC()
	nowMinusOneMonth := now.AddDate(0, -1, 0)
	rangeTime := now.Sub(nowMinusOneMonth)
	nbDaysThisMonth := int(rangeTime.Hours() / 24)

	assert.Equal(t, "New Project", projectOutputWithMetrics.Data.Title)
	assert.Equal(t, uuid, projectOutputWithMetrics.Data.UUID)
	assert.Equal(t, 1, projectOutputWithMetrics.Data.Metrics.RequestsCount)
	assert.Equal(t, nbDaysThisMonth, len(projectOutputWithMetrics.Data.Metrics.RequestsByDay))
	assert.Equal(t, 1, len(projectOutputWithMetrics.Data.Metrics.RPCUsage))
	assert.Equal(t, 1, projectOutputWithMetrics.Data.Metrics.RPCUsage[0].Value)
	assert.Equal(t, "/mockserver/status", projectOutputWithMetrics.Data.Metrics.RPCUsage[0].ID)
	assert.Equal(t, "/mockserver/status", projectOutputWithMetrics.Data.Metrics.RPCUsage[0].Label)
}

func stubMetricsRepository(error error) *mockMetricsRepository {
	mockMetricsRepository := &mockMetricsRepository{}
	mockMetricsRepository.
		On("Save", mock.Anything).
		Return(error).
		Once()
	mockMetricsRepository.
		On("SaveMany", mock.Anything).
		Return(error).
		Once()
	return mockMetricsRepository
}

func stubCacheMetricsRepository(error error) *mockCacheMetricsRepository {
	mockCacheMetricsRepository := &mockCacheMetricsRepository{}
	// TODO Add the stubs
	mockCacheMetricsRepository.
		On("Add", mock.Anything).
		Return(error).
		Once()
	mockCacheMetricsRepository.
		On("Len").
		Return(10).
		Once()

	noinputs := make([]*dbinputs.MetricsInput, 0)
	mockCacheMetricsRepository.
		On("GetAll").
		Return(noinputs, error).
		Once()
	return mockCacheMetricsRepository
}
