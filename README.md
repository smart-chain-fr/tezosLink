[![Artifact Hub](https://img.shields.io/endpoint?url=https://artifacthub.io/badge/repository/tezoslink)](https://artifacthub.io/packages/search?repo=tezoslink)

# TezosLink Community Kubernetes Helm Charts

## Introduction
TezosLink provides a cutting-edge gateway to access the Tezos Network for DApps and bring the Tezos Link back
from its ashes with an upgrade. It come along with a new dashboard with the some key metrics to facilitate TezosLink usage and monitoring. With a turnkey solution and via Tezos K8s, it allows you to deploy a Tezos Node on a select cloud provider (AWS, GCP, Azure, Scaleway).

## Architecture


## Requirements

### For a deployment on Cloud

#### Hardware
(à completer à la fin du projet)

#### Tools

You need the following tools to install tezos-link :

- Helm CLI : [Helm Installation](https://helm.sh/docs/intro/install/)
- Kubectl : [Kubectl Installation](https://kubernetes.io/docs/tasks/tools/)

### For a deployment on your local workspace
You need :
- minikube : [Minikube](https://minikube.sigs.k8s.io/docs/)

## Deployments

The installation of TezosLink is composed of several different Helm charts :

- [Tezos-k8s](https://tezos-k8s.xyz/)
- [Bitnami PostgreSQL](https://artifacthub.io/packages/helm/bitnami/postgresql)
- tezos-link Helm charts (WIP)
- [Bitnami Prometheus](https://artifacthub.io/packages/helm/bitnami/kube-prometheus)

### Release version

| Helm charts  | Version  |
|---|---|
|  tezos-k8s | x.x.x  |
|  tezoslink-proxy | x.x.x  |
|  bitnami/postgresql | 12.1.5  |
|  tezoslink-api | x.x.x  |
|  bitnami/kube-prometheus | 8.3.2  |


### Tezos-k8s deployment
TezosLink is based on Tezos node. Thanks to the Oxhead Alpha Community, who provide a clean Helm chart to deploy a node on Tezos, depending on your needs. To do so, you have to : 

1. Add the Helm chart repository to your local Helm installation:

```console
helm repo add oxheadalpha https://oxheadalpha.github.io/tezos-helm-charts/
```

2. Install the node :  
Before installing the node, you need to choose some pararmeters according to your needs. They are initialised in the 
  values.yml, located in tezos-k8s/charts/tezos

* The Tezos node version :  
It's the current version of Tezos, you'll like to install. It can be any version, just make sure it's officially available.  
The variable name is : 
```console
images:
  octez: tezos/tezos:v15-release
```

* The protocol :  
According to the Tezos version, the protocol must be specified.  
Please refer to to the [Tezos documentation](https://tezos.gitlab.io/protocols/naming.html) to check the protocol name (command) linked to the Tezos version.
```console
protocols:
  ## Tezos builds baker binaries for every supported protocol.
  ## ...
  - command: PtLimaPt
    vote: {}
```


* The history mode :  
This variable tells us the type of data we want to pull from the Tezos legder or the kind of request we are sending. Please refer to for more detail. Du to Tezos Link dutties, we need to have not only an archive node, but also a rolling node.  
Here's an example of configuration to deploy both mode :

```console
nodes:
  rolling-node:
    storage_size: 100Gi
    runs:
      - octez_node
    instances:
      - is_bootstrap_node: false
        config:
          shell:
            history_mode: rolling
          metrics_addr: [ "0.0.0.0:9932" ]
  archive-node:
    storage_size: 1000Gi
    runs:
      - octez_node
    instances:
      - is_bootstrap_node: false
        config:
          shell:
            history_mode: archive
          metrics_addr: [ "0.0.0.0:9932" ]
```

* The network 


* The snapshots datasources 


### Tezos-link installation

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
