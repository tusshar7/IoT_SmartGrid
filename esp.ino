
#include <FirebaseESP32.h>
#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>
#include <WebSocketsClient.h>
#define FIREBASE_HOST "testing-2785b.firebaseio.com"
#define FIREBASE_AUTH "bJmPiRUxMGUrzx53MlGDfAVncAaA97l7XevZ3nfR"
uint8_t pin_led = 16;
int users_node1;
char* ssid = "Connectify-217";
char* password = "syvovud7";
WebSocketsClient webSocket;
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {

  switch(type) {
    case WStype_DISCONNECTED:
      Serial.println("[WSc] Disconnected!\n");
      break;
    case WStype_CONNECTED:
      Serial.println("connected");
      break;
  }
}
void setup()
{
  pinMode(pin_led, OUTPUT);
  WiFi.begin(ssid,password);
  Serial.begin(115200);
  while(WiFi.status()!=WL_CONNECTED)
  {
    Serial.print(".");
    delay(500);
  }
  Serial.println("");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  webSocket.beginSocketIO("192.168.8.1",2000);
  webSocket.onEvent(webSocketEvent);
  webSocket.setReconnectInterval(5000);
}

void loop()
{
   
     if(Firebase.failed())
  {
    Serial.println("Internet lost");
    delay(5000);
  }
  users_node1=Firebase.getInt("users_node1");
  int total=users_node1;
  while(users_node1--)
  {
    int x=total-users_node1;
    String path=String("nodes/node1/user");
    path=path+x;
    Serial.print(path);
    Firebase.setFloat(path,45);
    Firebase.setFloat(path,4.5);
  //Firebase.setFloat("nodes/node1/user"+x,20.8); 
  }
  webSocket.loop();
}