variable region {
    description = "Región de AWS donde se desplegarán los recursos"
    type        = string
    default     = "us-east-1"
}

variable load_balancer_url {
    description = "URL del balanceador de carga para el servicio API"
    type        = string
}

variable rol_lab_arn {
    description = "ARN del rol del laboratorio en AWS Academy"
    type        = string
}
