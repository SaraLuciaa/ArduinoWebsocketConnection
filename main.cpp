#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include "Adafruit_VL53L0X.h"

const char* ssid = "pium";       // Reemplaza con tu SSID
const char* password = "gluglu123"; // Reemplaza con tu contraseña

AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

Adafruit_VL53L0X lox = Adafruit_VL53L0X();


// Función para conectar al Wi-Fi en un bucle
void connectToWiFi() {
  Serial.print("Conectando a WiFi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConectado a WiFi");
  Serial.print("Dirección IP: ");
  Serial.println(WiFi.localIP());
}

void onWebSocketEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type,
                      void *arg, uint8_t *data, size_t len) {
  if (type == WS_EVT_CONNECT) {
    Serial.println("Cliente WebSocket conectado");
  } else if (type == WS_EVT_DISCONNECT) {
    Serial.println("Cliente WebSocket desconectado");
  }
}

void setup() {
  Serial.begin(115200);
  connectToWiFi();

  // Inicializar el sensor VL53L0X
  if (!lox.begin()) {
    Serial.println("Error al iniciar VL53L0X");
    while (1);
  }

  // Configurar el WebSocket
  ws.onEvent(onWebSocketEvent);
  server.addHandler(&ws);

  // Iniciar el servidor
  server.begin();
}

void loop() {
  // Mantener la conexión Wi-Fi
  if (WiFi.status() != WL_CONNECTED) {
    connectToWiFi();
  }

  // Enviar datos al WebSocket si está conectado
  VL53L0X_RangingMeasurementData_t measure;
  lox.rangingTest(&measure, false);

  if (measure.RangeStatus != 4) {
    int distance = measure.RangeMilliMeter;
    long timestamp = millis();

    // Enviar datos a través del WebSocket
    String message = String("{\"time\":") + timestamp + ",\"distance\":" + distance + "}";
    ws.textAll(message);
  }

  delay(100);
}