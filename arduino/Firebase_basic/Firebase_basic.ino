#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>

#define WIFI_SSID       "Anuson"
#define WIFI_PASSWORD   "12345678"

#define FIREBASE_HOST "app-host-2c179.firebaseio.com"
#define FIREBASE_AUTH "bKXwX7BBivkq2GvJKWwa3sz2Mf78erPFb71vXM70"


const int led = D2;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Serial.println(WiFi.localIP());
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());

  pinMode(led, OUTPUT);
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.setInt("device/Light_bulb/control", 1);
  
}

void loop() {
  // put your main code here, to run repeatedly:
  
  digitalWrite(led, Firebase.getInt("device/Light_bulb/control"));
  //delay(10);
  
}
