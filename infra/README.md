## Inicializar el estado de Terraform

AWS_PROFILE=academy terraform init -backend-config "bucket=my-tiendavirtual-iac-state" -backend-config "dynamodb_table=terraform-locks"

## Validar el plan de Terraform

AWS_PROFILE=academy terraform validate

## Ejecutar el plan de Terraform

AWS_PROFILE=academy terraform plan --var-file=main.tfvars

## Aplicar el plan de Terraform

AWS_PROFILE=academy terraform apply --var-file=main.tfvars

## Destruir toda la infraestructura creada

AWS_PROFILE=academy terraform destroy --var-file=main.tfvars