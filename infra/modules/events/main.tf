resource "aws_cloudwatch_event_bus" "ordenes_bus" {
    name = "ordenes-bus"
}

resource "aws_cloudwatch_event_rule" "crear_orden" {
    name           = "crear-orden"
    description    = "Regla para crear orden desde evento personalizado"
    event_bus_name = aws_cloudwatch_event_bus.ordenes_bus.name
    event_pattern = jsonencode({
        source       = ["pe.com.tiendavirtual"],
        "detail-type": ["crear-orden"]
    })
}

resource "aws_cloudwatch_event_target" "target_lambda_crear_orden" {
    rule      = aws_cloudwatch_event_rule.crear_orden.name
    target_id = "crear-orden-lambda"
    arn       = var.crear_orden_funcion_arn
    event_bus_name = aws_cloudwatch_event_bus.ordenes_bus.name
}

resource "aws_lambda_permission" "allow_eventbridge" {
    statement_id  = "AllowExecutionFromEventBridge"
    action        = "lambda:InvokeFunction"
    function_name = var.crear_orden_funcion_name
    principal     = "events.amazonaws.com"
    source_arn    = aws_cloudwatch_event_rule.crear_orden.arn
}