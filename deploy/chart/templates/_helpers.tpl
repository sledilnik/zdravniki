{{/*
Resource name. Constant "zdravniki" so stage/prod (each in its own org
namespace) and every preview namespace name their objects predictably.
*/}}
{{- define "zdravniki.fullname" -}}
{{- default "zdravniki" .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "zdravniki.labels" -}}
app.kubernetes.io/name: {{ include "zdravniki.fullname" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
helm.sh/chart: {{ printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" }}
{{- end -}}

{{- define "zdravniki.selectorLabels" -}}
app.kubernetes.io/name: {{ include "zdravniki.fullname" . }}
{{- end -}}
