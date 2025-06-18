variable "nombre_cluster" {
  type = string
  description = "Nombre del clúster ECS donde se desplegará la tarea"
}

variable "familia_tarea" {
  type = string
  description = "Nombre de la familia de tareas ECS"
}

variable "rol_lab_arn" {
  type = string
  description = "ARN del rol IAM que la tarea ECS utilizará"
}

variable "id_cuenta_aws" {
  type = string
}

variable "region_aws" {
  type = string
}

variable "nombre_repo_ecr" {
  type = string
  description = "Nombre del repositorio ECR donde se almacenará la imagen del contenedor"
}

variable "servidor_base_datos" {
  type = string
  description = "URL de la base de datos para la aplicación"
}

variable "usuario_base_datos" {
  type = string
  description = "Usuario de la base de datos para la aplicación"
}

variable "contrasenha_base_datos" {
  type = string
  description = "Contraseña de la base de datos para la aplicación"
}  

variable "nombre_base_datos" {
  type = string
  description = "Nombre de datos para la aplicación" 
}

variable "puerto_base_datos" {
  type = string
  description = "Puerto de la base de datos para la aplicación" 
}

variable "nombre_servicio_ecs" {
  type = string
  description = "Nombre del servicio ECS donde se desplegará la tarea"
}

