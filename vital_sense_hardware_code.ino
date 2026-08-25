#include <Wire.h>
#include <MAX30102_PulseOximeter.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

// FreeRTOS Task Handles
TaskHandle_t MAX30102_TaskHandle = NULL;
TaskHandle_t Firebase_TaskHandle = NULL;
TaskHandle_t Temp_TaskHandle = NULL;

// Shared Resources Protection
SemaphoreHandle_t xMutex = NULL;
float currentTemp = 0;
float heartRate = 0;
float spO2 = 0;

// WiFi & Firebase Config
#define WIFI_SSID "Emmanuel"
#define WIFI_PASSWORD "Emmanuel1"
#define FIREBASE_API_KEY "AIzaSyAzm5Z3INQT-GHOLeFGPJSJ2WlS-F_EEvA"
#define FIREBASE_DB_URL "https://hackathon-rtdb-b0e7f-default-rtdb.firebaseio.com/"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
bool signupOK = false;

// Sensor Config
#define MAX30102_SDA 21
#define MAX30102_SCL 22
#define DS18B20_PIN 4

// MAX30102 Object
PulseOximeter pox;

// DS18B20 Objects
OneWire oneWire(DS18B20_PIN);
DallasTemperature tempSensor(&oneWire);

void onBeatDetected() {
  Serial.println("♥ Heartbeat!");
}

// MAX30102 Task (Core 0, Highest Priority)
void MAX30102_Task(void *pvParameters) {
  Wire.begin(MAX30102_SDA, MAX30102_SCL);
  Wire.setClock(400000);
  
  if (!pox.begin()) {
    Serial.println("MAX30102 FAIL");
    while(1);
  }
  pox.setOnBeatDetectedCallback(onBeatDetected);
  
  // Fixed constant name to match VEGA_MAX30102 library definitions
  pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);

  for(;;) {
    pox.update(); // Must run continuously
    
    if(xSemaphoreTake(xMutex, portMAX_DELAY) == pdTRUE) {
      heartRate = pox.getHeartRate();
      spO2 = pox.getSpO2();
      xSemaphoreGive(xMutex);
    }
    
    vTaskDelay(1 / portTICK_PERIOD_MS);
  }
}

// Temperature Task (Core 0, Medium Priority)
void Temp_Task(void *pvParameters) {
  tempSensor.begin();
  tempSensor.setResolution(12);
  tempSensor.setWaitForConversion(false);

  for(;;) {
    static uint32_t lastTempRequest = 0;
    static bool tempPending = false;
    
    if(!tempPending) {
      tempSensor.requestTemperatures();
      tempPending = true;
      lastTempRequest = millis();
    }

    if(tempPending && (millis() - lastTempRequest >= 750)) {
      if(xSemaphoreTake(xMutex, portMAX_DELAY) == pdTRUE) {
        currentTemp = tempSensor.getTempCByIndex(0);
        xSemaphoreGive(xMutex);
      }
      tempPending = false;
    }
    vTaskDelay(100 / portTICK_PERIOD_MS);
  }
}

// Firebase Task (Core 1, Lowest Priority)
void Firebase_Task(void *pvParameters) {
  // Initialize WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while(WiFi.status() != WL_CONNECTED) {
    vTaskDelay(500 / portTICK_PERIOD_MS);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected");

  // Configure Firebase
  config.api_key = FIREBASE_API_KEY;
  config.database_url = FIREBASE_DB_URL;
  config.token_status_callback = tokenStatusCallback;

  // Sign in anonymously
  if(Firebase.signUp(&config, &auth, "", "")){
    signupOK = true;
    Serial.println("Firebase Auth OK");
  } else {
    Serial.printf("Signup Error: %s\n", config.signer.signupError.message.c_str());
  }

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  // Timing variables
  unsigned long sendDataPrevMillis = 0;
  const unsigned long timerDelay = 5000;

  for(;;) {
    if(Firebase.ready() && signupOK && (millis() - sendDataPrevMillis >= timerDelay)) {
      sendDataPrevMillis = millis();

      // Get protected data
      float temp, hr, oxygen;
      if(xSemaphoreTake(xMutex, portMAX_DELAY) == pdTRUE) {
        temp = currentTemp;
        hr = heartRate;
        oxygen = spO2;
        xSemaphoreGive(xMutex);
      }

      // Create JSON payload
      FirebaseJson json;
      json.set("Temperature", temp);
      json.set("HeartRate", hr);
      json.set("SpO2", oxygen);

      // Send to Firebase
      if(Firebase.RTDB.setJSON(&fbdo, "/SensorData", &json)) {
        Serial.println("Firebase Update Success");
      } else {
        Serial.println("Firebase Error: " + fbdo.errorReason());
      }
    }
    vTaskDelay(1000 / portTICK_PERIOD_MS);
  }
}

void setup() {
  Serial.begin(115200);
  xMutex = xSemaphoreCreateMutex();

  // Create MAX30102 Task (Core 0)
  xTaskCreatePinnedToCore(
    MAX30102_Task,
    "MAX30102",
    4096,
    NULL,
    3,  // Highest priority
    &MAX30102_TaskHandle,
    0
  );

  // Create Temperature Task (Core 0)
  xTaskCreatePinnedToCore(
    Temp_Task,
    "Temperature",
    2048,
    NULL,
    2,  // Medium priority
    &Temp_TaskHandle,
    0
  );

  // Create Firebase Task (Core 1)
  xTaskCreatePinnedToCore(
    Firebase_Task,
    "Firebase",
    8192,  // Larger stack for network ops
    NULL,
    1,  // Lowest priority
    &Firebase_TaskHandle,
    1
  );
}

void loop() {
  // FreeRTOS scheduler handles everything in background tasks
}