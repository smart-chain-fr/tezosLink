[![Artifact Hub](https://img.shields.io/endpoint?url=https://artifacthub.io/badge/repository/tezoslink)](https://artifacthub.io/packages/search?repo=tezoslink)

# TezosLink Community Kubernetes Helm Charts

## Introduction

[Helm](https://helm.sh) must be installed to use the charts.
Please refer to Helm's [documentation](https://helm.sh/docs/) to get started.

## Architecture

## Deployments

### Release version

| Helm charts  | Version  |
|---|---|
|  bitnami/postgresql | 12.1.5  |
|  bitnami/kube-prometheus | 8.3.2  |
|  tezos-k8s | x.x.x  |
|  tezoslink-proxy | x.x.x  |
|  tezoslink-api | x.x.x  |

### Prerequisites

1. Connect to your kubernetes cluster
2. Create the following namespace for the PostgreSQL database :

```console
kubectl create namespace tezoslink-postgresql
```

### PostgreSQL database deployment

1. create the following secret for the postgresql root user and for the api user :

```console
kubectl create secret generic -n tezoslink-postgresql tezoslink-postgresql `
    --from-literal=admin-password='Insert-a-strong-password' `
    --from-literal=tz-backend-password='Insert-a-strong-password'
```

2. Deploy the PostgreSQL helm chart provided by [bitnami](https://artifacthub.io/packages/helm/bitnami/postgresql)

```
helm repo add my-repo https://charts.bitnami.com/bitnami
helm upgrade -i tezoslink-postgresql bitnami/postgresql --version <refere to the release version section above> `
    --create-namespace --namespace tezoslink-postgresql `
    --set global.postgresql.auth.username="tz-backend" `
    --set global.postgresql.auth.database="tezoslink" `
    --set global.postgresql.auth.existingSecret="tezoslink-postgresql" `
    --set global.postgresql.auth.secretKeys.adminPasswordKey="admin-password" `
    --set global.postgresql.auth.secretKeys.userPasswordKey="tz-backend-password"
```
### Prometheus deployment

1. Install Prometheus helm chart provided by [bitnami](https://artifacthub.io/packages/helm/bitnami/kube-prometheus)

```
helm upgrade -i kube-prometheus bitnami/kube-prometheus --version <refere to the release version section above>  `
    --create-namespace --namespace kube-prometheus `
    --set alertmanager.enabled="false" `
    --set blackboxExporter.enabled="false"
```

### Tezos-k8s deployment

```console
helm repo add grafana https://smart-chain-fr.github.io/tezosLink/
```

