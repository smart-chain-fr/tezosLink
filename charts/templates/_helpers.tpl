{{/*
Expand the name of the chart.
*/}}
{{- define "helpers.name" -}}
{{- default .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "helpers.fullname" -}}
{{- if .Values.global.fullnameOverride }}
{{- .Values.global.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- .Release.Name | trunc 63 }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "helpers.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "helpers.labels.common" -}}
helm.sh/chart: {{ include "helpers.chart" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Proxy labels
*/}}
{{- define "helpers.labels.rpcgateway" -}}
{{- include "helpers.labels.common" .root }}
app.kubernetes.io/component : {{ printf "%s-%s" "rpcgateway" .network }}
{{- end }}

{{/*
Proxy testnet abels
*/}}
{{- define "helpers.labels.testnet.rpcgateway" -}}
{{- include "helpers.labels.common" . }}
app.kubernetes.io/component : {{ printf "%s-%s" "rpcgateway" (lower .Values.rpcgateway.testnet.network) }}
{{- end }}

{{/*
web labels
*/}}
{{- define "helpers.labels.web" -}}
{{- include "helpers.labels.common" . }}
app.kubernetes.io/component : web
{{- end }}

{{/*
api labels
*/}}
{{- define "helpers.labels.api" -}}
{{- include "helpers.labels.common" . }}
app.kubernetes.io/component : api
{{- end }}

{{/*
Selector labels
*/}}

{{/*
Selector labels
*/}}
{{- define "helpers.rpcgateway.selectorLabels" -}}
app.kubernetes.io/instance: {{ .root.Release.Name }}
app.kubernetes.io/component: rpcgateway
network: {{ .network }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "helpers.web.selectorLabels" -}}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/component : web
{{- end }}

{{/*
Selector labels
*/}}
{{- define "helpers.api.selectorLabels" -}}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/component : api
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "helpers.serviceAccountName" -}}
{{- default (include "helpers.fullname" .) .serviceAccount.name }}
{{- end }}

{{/*
Allow the release namespace to be overridden for multi-namespace deployments in combined charts.
*/}}
{{- define "helpers.namespace" -}}
{{- default .Release.Namespace .Values.global.namespaceOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "common.tplvalues.render" -}}
    {{- if typeIs "string" .value }}
        {{- tpl .value .context }}
    {{- else }}
        {{- tpl (.value | toYaml) .context }}
    {{- end }}
{{- end -}}