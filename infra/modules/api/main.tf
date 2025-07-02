resource "aws_apigatewayv2_api" "http_api" {
  name          = "split-wise-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    allow_headers = ["*"]
  }
}

resource "aws_apigatewayv2_integration" "expenses_integration_no_parameters" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/expenses"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "expenses_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/expenses/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "expenses_integration_group" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/expenses/group/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "groups_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/groups/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "groups_integration_no_parameters" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/groups"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "group_members_integration_no_parameters" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/group-members"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "group_members_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/group-members/group/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "group_members_integration_by_id" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/group-members/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "settlements_integration_no_parameters" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/settlements"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "settlements_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/settlements/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "settlements_integration_group" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/settlements/group/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "users_integration_no_parameters" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/users"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "users_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/users/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "users_integration_no_group_id" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/users/not/group/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}


resource "aws_apigatewayv2_stage" "default_stage" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true

  default_route_settings {
    throttling_burst_limit = 500
    throttling_rate_limit  = 1000
  }

  route_settings {
    route_key     = "$default"
    logging_level = "INFO"
  }
}

#########################################
# Routes - Expenses
#########################################
resource "aws_apigatewayv2_route" "expenses_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /expenses"
  target    = "integrations/${aws_apigatewayv2_integration.expenses_integration_no_parameters.id}"
}

resource "aws_apigatewayv2_route" "expenses_get_by_id" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /expenses/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.expenses_integration.id}"
}

resource "aws_apigatewayv2_route" "expenses_delete_by_id" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "DELETE /expenses/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.expenses_integration.id}"
}

resource "aws_apigatewayv2_route" "expenses_get_by_group" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /expenses/group/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.expenses_integration_group.id}"
}

#########################################
# Routes - Groups
#########################################
resource "aws_apigatewayv2_route" "groups_get_all" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /groups"
  target    = "integrations/${aws_apigatewayv2_integration.groups_integration_no_parameters.id}"
}

resource "aws_apigatewayv2_route" "groups_get_by_id" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /groups/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.groups_integration.id}"
}

resource "aws_apigatewayv2_route" "groups_update_by_id" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "PATCH /groups/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.groups_integration.id}"
}

resource "aws_apigatewayv2_route" "groups_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /groups"
  target    = "integrations/${aws_apigatewayv2_integration.groups_integration_no_parameters.id}"
}

#########################################
# Routes - Group Members
#########################################

resource "aws_apigatewayv2_route" "group_members_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /group-members"
  target    = "integrations/${aws_apigatewayv2_integration.group_members_integration_no_parameters.id}"
}

resource "aws_apigatewayv2_route" "group_members_get_by_group" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /group-members/group/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.group_members_integration.id}"
}


resource "aws_apigatewayv2_route" "group_members_delete_by_id" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "DELETE /group-members/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.group_members_integration_by_id.id}"
}

#########################################
# Routes - Settlements
#########################################
resource "aws_apigatewayv2_route" "settlements_get_all" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /settlements"
  target    = "integrations/${aws_apigatewayv2_integration.settlements_integration_no_parameters.id}"
}

resource "aws_apigatewayv2_route" "settlements_get_by_id" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /settlements/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.settlements_integration.id}"
}

resource "aws_apigatewayv2_route" "settlements_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /settlements/group/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.settlements_integration_group.id}"
}

#########################################
# Routes - Users
#########################################
resource "aws_apigatewayv2_route" "users_get_all" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /users"
  target    = "integrations/${aws_apigatewayv2_integration.users_integration_no_parameters.id}"
}

resource "aws_apigatewayv2_route" "users_get_by_id" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /users/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.users_integration.id}"
}

resource "aws_apigatewayv2_route" "users_delete_by_id" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "DELETE /users/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.users_integration.id}"
}

resource "aws_apigatewayv2_route" "users_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /users"
  target    = "integrations/${aws_apigatewayv2_integration.users_integration_no_parameters.id}"
}


resource "aws_apigatewayv2_route" "users_post_not_group" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /users/not/group/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.users_integration_no_group_id.id}"
}
