provider "azurerm" {
  features {}
}

# --- GenAI Gateway Foundation ---

resource "azurerm_resource_group" "ai" {
  name     = "rg-${var.project_name}-foundation-${var.environment}"
  location = var.location
}

# --- AI Governance Network ---

resource "azurerm_virtual_network" "ai" {
  name                = "vnet-${var.project_name}-governance-${var.environment}"
  location            = azurerm_resource_group.ai.location
  resource_group_name = azurerm_resource_group.ai.name
  address_space       = ["10.160.0.0/16"]

  tags = {
    Environment = var.environment
    CostCenter  = "AI-Platform"
  }
}

# --- Gateway Configuration Store (Postgres) ---

resource "azurerm_postgresql_flexible_server" "ai" {
  name                   = "psql-${var.project_name}-config-${var.environment}"
  resource_group_name    = azurerm_resource_group.ai.name
  location               = azurerm_resource_group.ai.location
  version                = "13"
  administrator_login    = "aiadmin"
  administrator_password = var.db_password
  storage_mb             = 32768
  sku_name               = "GP_Standard_D2ds_v4"
}

# --- Prompt Cache & Session Store (Redis) ---

resource "azurerm_redis_cache" "ai" {
  name                = "redis-${var.project_name}-cache-${var.environment}"
  location            = azurerm_resource_group.ai.location
  resource_group_name = azurerm_resource_group.ai.name
  capacity            = 1
  family              = "C"
  sku_name            = "Standard"
  enable_non_ssl_port = false
  minimum_tls_version = "1.2"
}

# --- AI Ingress (Application Gateway) ---

resource "azurerm_application_gateway" "ai" {
  name                = "agw-${var.project_name}-ingress-${var.environment}"
  resource_group_name = azurerm_resource_group.ai.name
  location            = azurerm_resource_group.ai.location

  sku {
    name     = "Standard_v2"
    tier     = "Standard_v2"
    capacity = 2
  }

  gateway_ip_configuration {
    name      = "my-gateway-ip-configuration"
    subnet_id = azurerm_subnet.ingress.id
  }

  frontend_port {
    name = "http_port"
    port = 80
  }

  frontend_ip_configuration {
    name                 = "my-frontend-ip-configuration"
    public_ip_address_id = azurerm_public_ip.ai.id
  }

  backend_address_pool {
    name = "ai-gateway-pool"
  }

  backend_http_settings {
    name                  = "http_settings"
    cookie_based_affinity = "Disabled"
    port                  = 8000
    protocol              = "Http"
    request_timeout       = 60
  }

  http_listener {
    name                           = "listener"
    frontend_ip_configuration_name = "my-frontend-ip-configuration"
    frontend_port_name             = "http_port"
    protocol                       = "Http"
  }

  request_routing_rule {
    name                       = "rule1"
    rule_type                  = "Basic"
    http_listener_name         = "listener"
    backend_address_pool_name  = "ai-gateway-pool"
    backend_http_settings_name = "http_settings"
    priority                   = 1
  }
}
