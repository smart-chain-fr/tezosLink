
Tezos-link
===========

A Helm chart to deploy a management dashboard for Tezos Nodes


## Configuration

The following table lists the configurable parameters of the Tezos-link chart and their default values.

| Parameter                | Description             | Default        |
| ------------------------ | ----------------------- | -------------- |
| `global.fullnameOverride` | Overrides the name of the app name, by default, name of the release | `""` |
| `global.namespaceOverride` | Overrides the namespace to deploy the app, by default, current namespace | `""` |
| `env.DATABASE_HOSTNAME` | Hostname of the database | `"localhost"` |
| `env.DATABASE_PORT` | Port of the database | `5432` |
| `env.DATABASE_USER` | Database user | `"postgres"` |
| `env.DATABASE_PASSWORD` | Database user password | `"postgres"` |
| `env.DATABASE_NAME` | Database name | `"tezoslink"` |
| `env.DEV_PRISMA_STUDIO_DB_URL` | Connexion string for Prisma | `null` |
| `env.WEB_LABEL` |  | `"web"` |
| `env.WEB_PORT` | Port of the frontend, only used to setup the server | `3000` |
| `env.WEB_ROOT_URL` | Root URL of the frontend | `"/"` |
| `env.API_HOSTNAME` | Endpoint needed for communication with the frontend | `"localhost"` |
| `env.API_LABEL` |  | `"api"` |
| `env.API_PORT` | Port of the API | `3001` |
| `env.API_ROOT_URL` | Root URL of the API | `"/api"` |
| `env.MAINNET_RPC_GATEWAY_HOSTNAME` | Endpoint used by the frontend | `"localhost"` |
| `env.MAINNET_RPC_GATEWAY_LABEL` |  | `"rpcgw"` |
| `env.MAINNET_RPC_GATEWAY_PORT` | Port of the RPC gateway for mainnet | `3002` |
| `env.MAINNET_RPC_GATEWAY_ROOT_URL` | Root URL of the RPC gateway for mainnet | `"/rpc-mainnet"` |
| `env.TESTNET_RPC_GATEWAY_HOSTNAME` | Endpoint used by the frontend | `"localhost"` |
| `env.TESTNET_RPC_GATEWAY_LABEL` |  | `"rpcgw"` |
| `env.TESTNET_RPC_GATEWAY_PORT` | Port pf the RPC gateway for testnet | `3002` |
| `env.TESTNET_RPC_GATEWAY_ROOT_URL` | Root URL of the RPC gateway for testnet | `"/rpc-testnet"` |
| `env.MAINNET_ARCHIVE_NODES_URL` | URL or IP address of the mainnet archive node | `"localhost"` |
| `env.MAINNET_ARCHIVE_NODES_PORT` | Port of the mainnet archive node | `"port"` |
| `env.MAINNET_ROLLING_NODES_URL` | URL or IP address of the mainnet rolling node | `"localhost"` |
| `env.MAINNET_ROLLING_NODES_PORT` | Port of the mainnet rolling node | `"port"` |
| `env.TESTNET_ARCHIVE_NODES_URL` | URL or IP address of the testnet archive node | `"localhost"` |
| `env.TESTNET_ARCHIVE_NODES_PORT` | Port of the testnet archive node | `"port"` |
| `env.TESTNET_ROLLING_NODES_URL` | URL or IP address of the testnet rolling node | `"localhost"` |
| `env.TESTNET_ROLLING_NODES_PORT` | Port of the testnet rolling node | `"port"` |
| `env.PROMETHEUS_URL` | Endpoint to connect to Prometheus | `"localhost"` |
| `env.PROMETHEUS_NAMESPACE_TEZOSLINK` | Kubernetes namespace where TezosLink is deployed | `"namespace"` |
| `env.PROMETHEUS_NAMESPACE_TEZOS_K8S_TESTNET` | Kubernetes namespace where TezosK8s is deployed | `"namespace"` |
| `env.PROMETHEUS_NAMESPACE_TEZOS_K8S_MAINNET` | Kubernetes namespace where TezosK8s is deployed | `"namespace"` |
| `common.ingress.enabled` | Enables the creation of an ingress for all the services | `false` |
| `common.ingress.tls` | Enables the TLS block of the ingress | `false` |
| `common.ingress.annotations` | Annotations for the ingress | `{}` |
| `common.ingress.labels` | Labels for the ingress | `{}` |
| `api.enabled` | Enables the API service | `true` |
| `api.replicas` | Number of pods replicas desired for the API service | `1` |
| `api.image.repository` | Repository containing the API image | `"rg.fr-par.scw.cloud/tezoslink/p1-api"` |
| `api.image.tag` | Version of the API image | `"v1.3.10"` |
| `api.image.pullPolicy` |  | `"Always"` |
| `api.service.type` | Service type can be: ClusterIP, NodePort or LoadBalancer | `"ClusterIP"` |
| `api.service.clusterIP` | Specify private cluster IP | `""` |
| `api.service.nodePorts.http` | Node port to expose | `""` |
| `api.service.loadBalancerSourceRanges` | Source Range allow list | `[]` |
| `api.service.annotations` | Service annotations | `{}` |
| `api.ingress.enabled` | Enables ingress creation | `false` |
| `api.ingress.host` | URL of the api ingress | `null` |
| `api.ingress.tls.enabled` | Enable TLS block | `false` |
| `api.ingress.tls.secretName` | Name of the secret that contains or will contain the certificate | `null` |
| `api.ingress.annotations` | Annotations of the ingress | `{}` |
| `api.ingress.labels` | Labels of the ingress | `{}` |
| `api.serviceAccount.create` | Create a service account for the API | `false` |
| `api.serviceAccount.annotations` | Annotations of the API service account | `{}` |
| `api.serviceAccount.name` | Default name: api-sa | `""` |
| `api.secret` | Secrets to be injected as environment variables | `[]` |
| `api.additionalSecrets` | Additional secrets to mount as environment variables | `[]` |
| `api.resources.limits` | CPU and memory limits | `{}` |
| `api.resources.requests` | CPU and memory requests | `{}` |
| `api.podSecurityContext.enabled` | Enables the pod security context | `true` |
| `api.podSecurityContext.runAsUser` | Uses the TezosLink to run the container | `10000` |
| `api.podSecurityContext.runAsGroup` | Sets the primary group ID | `null` |
| `api.podSecurityContext.fsGroup` | Sets the owner of /data | `null` |
| `api.podSecurityContext.runAsNonRoot` | Start the process not using the root user (runAsUser field required) | `true` |
| `api.livenessProbe.enabled` | Enables the liveness probe | `false` |
| `api.livenessProbe.path` | Route of the healthcheck endpoint | `"/health"` |
| `api.livenessProbe.port` | Port of the healthcheck endpoint | `8001` |
| `api.livenessProbe.initialDelaySeconds` | Initial delay before starting the healthcheck | `5` |
| `api.livenessProbe.periodSeconds` | Frequency of the liveness test | `10` |
| `api.livenessProbe.timeoutSeconds` | Timeout for probe responses | `5` |
| `api.livenessProbe.failureThreshold` | The number of consecutive failed results needed to switch probe status to “Failure” | `6` |
| `api.livenessProbe.successThreshold` | The number of consecutive success results needed to switch probe status to “Success” | `1` |
| `api.readinessProbe.enabled` | Enables the liveness probe | `false` |
| `api.readinessProbe.path` | Route of the healthcheck endpoint | `"/health"` |
| `api.readinessProbe.port` | Port of the healthcheck endpoint | `8001` |
| `api.readinessProbe.initialDelaySeconds` | Initial delay before starting the healthcheck | `5` |
| `api.readinessProbe.periodSeconds` | Frequency of the readiness test | `10` |
| `api.readinessProbe.timeoutSeconds` | Timeout for probe responses | `5` |
| `api.readinessProbe.failureThreshold` | The number of consecutive failed results needed to switch probe status to “Failure” | `6` |
| `api.readinessProbe.successThreshold` | The number of consecutive success results needed to switch probe status to “Success” | `1` |
| `web.enabled` | Enables the front service | `true` |
| `web.replicas` | Number of pods replicas desired for the front service | `1` |
| `web.image.repository` | Repository containing the front image | `"rg.fr-par.scw.cloud/tezoslink/p1-frontend"` |
| `web.image.tag` | Version of the front image | `"v1.3.25"` |
| `web.image.pullPolicy` |  | `"Always"` |
| `web.service.type` | Service type can be: ClusterIP, NodePort or LoadBalancer | `"ClusterIP"` |
| `web.service.clusterIP` | Specify private cluster IP | `""` |
| `web.service.nodePorts.http` | Node port to expose | `""` |
| `web.service.loadBalancerSourceRanges` | Source Range allow list | `[]` |
| `web.service.annotations` | Service annotations | `{}` |
| `web.serviceAccount.create` | Create a service account for the API | `false` |
| `web.serviceAccount.annotations` | Annotations of the API service account | `{}` |
| `web.serviceAccount.name` | Default name: front-sa | `""` |
| `web.ingress.enabled` | Enables ingress creation | `false` |
| `web.ingress.host` | URL of the web ingress | `null` |
| `web.ingress.tls.enabled` | Enable TLS block | `false` |
| `web.ingress.tls.secretName` | Name of the secret that contains or will contain the certificate | `null` |
| `web.ingress.annotations` | Annotations of the ingress | `{}` |
| `web.ingress.labels` | Labels of the ingress | `{}` |
| `web.secret` | Secrets to be injected as environment variables | `[]` |
| `web.additionalSecrets` | Additional secrets to mount as environment variables | `[]` |
| `web.resources.limits` | CPU and memory limits | `{}` |
| `web.resources.requests` | CPU and memory requests | `{}` |
| `web.podSecurityContext.enabled` | Enables the pod security context | `true` |
| `web.podSecurityContext.runAsUser` | Uses the TezosLink to run the container | `10000` |
| `web.podSecurityContext.runAsGroup` | Sets the primary group ID | `null` |
| `web.podSecurityContext.fsGroup` | Sets the owner of /data | `null` |
| `web.podSecurityContext.runAsNonRoot` | Start the process not using the root user (runAsUser field required) | `true` |
| `web.livenessProbe.enabled` | Enables the liveness probe | `false` |
| `web.livenessProbe.path` | Route of the healthcheck endpoint | `"/health"` |
| `web.livenessProbe.port` | Port of the healthcheck endpoint | `8001` |
| `web.livenessProbe.initialDelaySeconds` | Initial delay before starting the healthcheck | `5` |
| `web.livenessProbe.periodSeconds` | Frequency of the liveness test | `10` |
| `web.livenessProbe.timeoutSeconds` | Timeout for probe responses | `5` |
| `web.livenessProbe.failureThreshold` | The number of consecutive failed results needed to switch probe status to “Failure” | `6` |
| `web.livenessProbe.successThreshold` | The number of consecutive success results needed to switch probe status to “Success” | `1` |
| `web.readinessProbe.enabled` | Enables the liveness probe | `false` |
| `web.readinessProbe.path` | Route of the healthcheck endpoint | `"/health"` |
| `web.readinessProbe.port` | Port of the healthcheck endpoint | `8001` |
| `web.readinessProbe.initialDelaySeconds` | Initial delay before starting the healthcheck | `5` |
| `web.readinessProbe.periodSeconds` | Frequency of the readiness test | `10` |
| `web.readinessProbe.timeoutSeconds` | Timeout for probe responses | `5` |
| `web.readinessProbe.failureThreshold` | The number of consecutive failed results needed to switch probe status to “Failure” | `6` |
| `web.readinessProbe.successThreshold` | The number of consecutive success results needed to switch probe status to “Success” | `1` |
| `rpcgateway.testnet.enabled` | Enables the rpc service for tesnet | `true` |
| `rpcgateway.testnet.replicas` | Number of pods replicas desired for the rpc service for testnet | `1` |
| `rpcgateway.testnet.network` | Name of the testnet network | `"TESTNET"` |
| `rpcgateway.testnet.image.repository` | Repository containing the rpc gateway image | `"rg.fr-par.scw.cloud/tezoslink/p1-proxy"` |
| `rpcgateway.testnet.image.tag` | Version of the rpc gateway image | `"v1.3.9"` |
| `rpcgateway.testnet.image.pullPolicy` |  | `"IfNotPresent"` |
| `rpcgateway.testnet.secret` | Secrets to be injected as environment variables | `[]` |
| `rpcgateway.testnet.additionalSecrets` | Additional secrets to mount as environment variables | `[]` |
| `rpcgateway.testnet.serviceAccount.create` | Create a service account for the API | `false` |
| `rpcgateway.testnet.serviceAccount.annotations` | Annotations of the API service account | `{}` |
| `rpcgateway.testnet.serviceAccount.name` | Default name: testnet-rpcgateway-sa | `""` |
| `rpcgateway.testnet.service.type` | Service type can be: ClusterIP, NodePort or LoadBalancer | `"ClusterIP"` |
| `rpcgateway.testnet.service.clusterIP` | Specify private cluster IP | `""` |
| `rpcgateway.testnet.service.nodePorts.http` | Node port to expose | `""` |
| `rpcgateway.testnet.service.loadBalancerSourceRanges` | Source Range allow list | `[]` |
| `rpcgateway.testnet.service.annotations` | Service annotations | `{}` |
| `rpcgateway.testnet.ingress.enabled` | Enables ingress creation | `false` |
| `rpcgateway.testnet.ingress.host` | URL of the testnet rpc gateway | `null` |
| `rpcgateway.testnet.ingress.tls.enabled` | Enable TLS block | `false` |
| `rpcgateway.testnet.ingress.tls.secretName` | Name of the secret that contains or will contain the certificate | `null` |
| `rpcgateway.testnet.ingress.annotations` | Annotations of the ingress | `{}` |
| `rpcgateway.testnet.ingress.labels` | Labels of the ingress | `{}` |
| `rpcgateway.testnet.podSecurityContext.enabled` | Enables the pod security context | `true` |
| `rpcgateway.testnet.podSecurityContext.runAsUser` | Uses the TezosLink to run the container | `10000` |
| `rpcgateway.testnet.podSecurityContext.runAsGroup` | Sets the primary group ID | `null` |
| `rpcgateway.testnet.podSecurityContext.fsGroup` | Sets the owner of /data | `null` |
| `rpcgateway.testnet.podSecurityContext.runAsNonRoot` | Start the process not using the root user (runAsUser field required) | `true` |
| `rpcgateway.testnet.livenessProbe.enabled` | Enables the liveness probe | `false` |
| `rpcgateway.testnet.livenessProbe.path` | Route of the healthcheck endpoint | `"/health"` |
| `rpcgateway.testnet.livenessProbe.port` | Port of the healthcheck endpoint | `8001` |
| `rpcgateway.testnet.livenessProbe.initialDelaySeconds` | Initial delay before starting the healthcheck | `5` |
| `rpcgateway.testnet.livenessProbe.periodSeconds` | Frequency of the liveness test | `10` |
| `rpcgateway.testnet.livenessProbe.timeoutSeconds` | Timeout for probe responses | `5` |
| `rpcgateway.testnet.livenessProbe.failureThreshold` | The number of consecutive failed results needed to switch probe status to “Failure” | `6` |
| `rpcgateway.testnet.livenessProbe.successThreshold` | The number of consecutive success results needed to switch probe status to “Success” | `1` |
| `rpcgateway.testnet.readinessProbe.enabled` | Enables the liveness probe | `false` |
| `rpcgateway.testnet.readinessProbe.path` | Route of the healthcheck endpoint | `"/health"` |
| `rpcgateway.testnet.readinessProbe.port` | Port of the healthcheck endpoint | `8001` |
| `rpcgateway.testnet.readinessProbe.initialDelaySeconds` | Initial delay before starting the healthcheck | `5` |
| `rpcgateway.testnet.readinessProbe.periodSeconds` | Frequency of the readiness test | `10` |
| `rpcgateway.testnet.readinessProbe.timeoutSeconds` | Timeout for probe responses | `5` |
| `rpcgateway.testnet.readinessProbe.failureThreshold` | The number of consecutive failed results needed to switch probe status to “Failure” | `6` |
| `rpcgateway.testnet.readinessProbe.successThreshold` | The number of consecutive success results needed to switch probe status to “Success” | `1` |
| `rpcgateway.testnet.resources.limits` | CPU and memory limits | `{}` |
| `rpcgateway.testnet.resources.requests` | CPU and memory requests | `{}` |
| `rpcgateway.mainnet.enabled` | Enables the rpc service for mainnet | `false` |
| `rpcgateway.mainnet.replicas` | Number of pods replicas desired for the rpc service for mainnet | `1` |
| `rpcgateway.mainnet.network` | Name of the mainnet network | `"MAINNET"` |
| `rpcgateway.mainnet.image.repository` | Repository containing the rpcgateway image | `"rg.fr-par.scw.cloud/tezoslink/p1-proxy"` |
| `rpcgateway.mainnet.image.tag` | Version of the rpc gateway image | `"v1.3.9"` |
| `rpcgateway.mainnet.image.pullPolicy` |  | `"IfNotPresent"` |
| `rpcgateway.mainnet.secret` | Secrets to be injected as environment variables | `[]` |
| `rpcgateway.mainnet.additionalSecrets` | Additional secrets to mount as environment variables | `[]` |
| `rpcgateway.mainnet.serviceAccount.create` | Create a service account for the API | `false` |
| `rpcgateway.mainnet.serviceAccount.annotations` | Annotations of the API service account | `{}` |
| `rpcgateway.mainnet.serviceAccount.name` | Default name: mainnet-rpcgateway-sa | `""` |
| `rpcgateway.mainnet.service.type` | Service type can be: ClusterIP, NodePort or LoadBalancer | `"ClusterIP"` |
| `rpcgateway.mainnet.service.clusterIP` | Specify private cluster IP | `""` |
| `rpcgateway.mainnet.service.nodePorts.http` | Node port to expose | `""` |
| `rpcgateway.mainnet.service.loadBalancerSourceRanges` | Source Range allow list | `[]` |
| `rpcgateway.mainnet.service.annotations` | Service annotations | `{}` |
| `rpcgateway.mainnet.ingress.enabled` | Enables ingress creation | `false` |
| `rpcgateway.mainnet.ingress.host` | URL of the mainnet rpc gateway | `null` |
| `rpcgateway.mainnet.ingress.tls.enabled` | Enable TLS block | `false` |
| `rpcgateway.mainnet.ingress.tls.secretName` | Name of the secret that contains or will contain the certificate | `null` |
| `rpcgateway.mainnet.ingress.annotations` | Annotations of the ingress | `{}` |
| `rpcgateway.mainnet.ingress.labels` | Labels of the ingress | `{}` |
| `rpcgateway.mainnet.podSecurityContext.enabled` | Enables the pod security context | `true` |
| `rpcgateway.mainnet.podSecurityContext.runAsUser` | Uses the TezosLink to run the container | `10000` |
| `rpcgateway.mainnet.podSecurityContext.runAsGroup` | Sets the primary group ID | `null` |
| `rpcgateway.mainnet.podSecurityContext.fsGroup` | Sets the owner of /data | `null` |
| `rpcgateway.mainnet.podSecurityContext.runAsNonRoot` | Start the process not using the root user (runAsUser field required) | `true` |
| `rpcgateway.mainnet.livenessProbe.enabled` | Enables the liveness probe | `false` |
| `rpcgateway.mainnet.livenessProbe.path` | Route of the healthcheck endpoint | `"/health"` |
| `rpcgateway.mainnet.livenessProbe.port` | Port of the healthcheck endpoint | `8001` |
| `rpcgateway.mainnet.livenessProbe.initialDelaySeconds` | Initial delay before starting the healthcheck | `5` |
| `rpcgateway.mainnet.livenessProbe.periodSeconds` | Frequency of the liveness test | `10` |
| `rpcgateway.mainnet.livenessProbe.timeoutSeconds` | Timeout for probe responses | `5` |
| `rpcgateway.mainnet.livenessProbe.failureThreshold` | The number of consecutive failed results needed to switch probe status to “Failure” | `6` |
| `rpcgateway.mainnet.livenessProbe.successThreshold` | The number of consecutive success results needed to switch probe status to “Success” | `1` |
| `rpcgateway.mainnet.readinessProbe.enabled` | Enables the liveness probe | `false` |
| `rpcgateway.mainnet.readinessProbe.path` | Route of the healthcheck endpoint | `"/health"` |
| `rpcgateway.mainnet.readinessProbe.port` | Port of the healthcheck endpoint | `8001` |
| `rpcgateway.mainnet.readinessProbe.initialDelaySeconds` | Initial delay before starting the healthcheck | `5` |
| `rpcgateway.mainnet.readinessProbe.periodSeconds` | Frequency of the readiness test | `10` |
| `rpcgateway.mainnet.readinessProbe.timeoutSeconds` | Timeout for probe responses | `5` |
| `rpcgateway.mainnet.readinessProbe.failureThreshold` | The number of consecutive failed results needed to switch probe status to “Failure” | `6` |
| `rpcgateway.mainnet.readinessProbe.successThreshold` | The number of consecutive success results needed to switch probe status to “Success” | `1` |
| `rpcgateway.mainnet.resources.limits` | CPU and memory limits | `{}` |
| `rpcgateway.mainnet.resources.requests` | CPU and memory requests | `{}` |
| `cron.enabled` |  | `true` |
| `cron.image.repository` | Repository containing the rpcgateway image | `"rg.fr-par.scw.cloud/tezoslink/p1-cron"` |
| `cron.image.tag` | Version of the rpc gateway image | `"v1.4.0"` |
| `cron.image.pullPolicy` |  | `"Always"` |
| `cron.resources.limits.cpu` |  | `"200m"` |
| `cron.resources.limits.memory` |  | `"256Mi"` |
| `cron.resources.requests.cpu` |  | `"100m"` |
| `cron.resources.requests.memory` |  | `"128Mi"` |
| `cron.secret` | Secrets to be injected as environment variables | `[]` |
| `cron.additionalSecrets` | Additional secrets to mount as environment variables | `[]` |
| `cron.podSecurityContext.enabled` | Enables the pod security context | `true` |
| `cron.podSecurityContext.runAsUser` | Uses the TezosLink to run the container | `10000` |
| `cron.podSecurityContext.runAsGroup` | Sets the primary group ID | `null` |
| `cron.podSecurityContext.fsGroup` | Sets the owner of /data | `null` |
| `cron.podSecurityContext.runAsNonRoot` | Start the process not using the root user (runAsUser field required) | `true` |



---
_Documentation generated by [Frigate](https://frigate.readthedocs.io)._
