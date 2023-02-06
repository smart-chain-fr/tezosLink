[![Artifact Hub](https://img.shields.io/endpoint?url=https://artifacthub.io/badge/repository/tezoslink)](https://artifacthub.io/packages/search?repo=tezoslink)

# TezosLink Community Kubernetes Helm Charts

## Introduction

## Architecture


## Requirements

### Hardware

### Tools

You need the following tools to install tezos-link :

- Helm CLI : [Helm Installation](https://helm.sh/docs/intro/install/)
- Kubectl : [Kubectl Installation](https://kubernetes.io/docs/tasks/tools/)

## Deployments

The installation of tezos-link is composed of several different Helm charts :

- [Tezos-k8s](https://tezos-k8s.xyz/)
- [Bitnami PostgreSQL](https://artifacthub.io/packages/helm/bitnami/postgresql)
- tezos-link Helm charts
- [Bitnami Prometheus](https://artifacthub.io/packages/helm/bitnami/kube-prometheus)

### Release version

| Helm charts  | Version  |
|---|---|
|  bitnami/postgresql | 12.1.5  |
|  bitnami/kube-prometheus | 8.3.2  |
|  tezos-k8s | x.x.x  |
|  tezoslink-proxy | x.x.x  |
|  tezoslink-api | x.x.x  |


### Tezos-k8s deployment

```console
helm repo add oxheadalpha https://oxheadalpha.github.io/tezos-helm-charts/
```




### tezos-link installation

1. Connect to your kubernetes cluster via kubectl command
2. Create the following namespace :

```console
kubectl create namespace tezos-link
```

3. Deploy the Bitnami PostgreSQL Helm chart :

3.1 create the following secret for the postgresql root user and for the api user :

```console
kubectl create secret generic -n tezos-link tezos-link-postgresql `
    --from-literal=admin-password='Insert-a-strong-password' `
    --from-literal=tezos-link-backend-password='Insert-a-strong-password'
```

3.2 Deploy the PostgreSQL helm chart provided by bitnami :

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

3.3 Deploy Prometheus helm chart provided by bitnami :

```
helm upgrade -i kube-prometheus bitnami/kube-prometheus --version <refere to the release version section above>  `
    --create-namespace --namespace kube-prometheus `
    --set alertmanager.enabled="false" `
    --set blackboxExporter.enabled="false"
```
