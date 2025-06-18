variable "entorno_ejecucion" {
  description = "Entorno de ejecución de la función Lambda"
  default     = "nodejs22.x"
}

variable "rol_lambda_arn" {
  description = "ARN del rol IAM que la función Lambda utilizará"
}

variable "url_base_servicio" {
  description = "URL base del servicio al que la función Lambda se conectará"
  type        = string
}
