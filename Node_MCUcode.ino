#include <FirebaseESP32.h>
#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>
#include <WebSocketsClient.h>
#define FIREBASE_HOST "testing-2785b.firebaseio.com"
#define FIREBASE_AUTH "bJmPiRUxMGUrzx53MlGDfAVncAaA97l7XevZ3nfR"
uint8_t pin_led = 16;
char* ssid = "Xender_AP430c";
char* password = "12345678";
void setup()
{
  pinMode(pin_led, OUTPUT);
  WiFi.begin(ssid,password);
  Serial.begin(9600);
  while(WiFi.status()!=WL_CONNECTED)
  {
    Serial.print(".");
    delay(500);
  }
  Serial.println("");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  //  webSocket.beginSocketIO("192.168.8.1",4000);
   // webSocket.onEvent(webSocketEvent);
    //webSocket.setReconnectInterval(5000);
}

void loop()
{
   
     if(Firebase.failed())
  {
    Serial.println("Internet lost");
    delay(5000);
  }
  if(Serial.available())
{
    if(Serial.read()==83){
    int row=Serial.read();
    Serial.println(row);
   // Serial.write(row);
    int user=Serial.read();
    Serial.println(user);
    //Serial.write(user);
    int V=Serial.read();
    //Serial.write(V);
    int I=Serial.read();
    //Serial.write(I);
    int P=Serial.read();
    //Serial.write(P);
    String path=String("nodes/node");
    path+=row;
    path+=String("/");
    path+=String("user");
    path+=user;
    path+=String("/");
    String voltage=path+String("Voltage");
    String current=path+String("Current");
    String power=path+String("Power");
    Firebase.setFloat(voltage,V);
    Firebase.setFloat(current,I);
    Firebase.setFloat(power,P);
}
}

 String loc=String("/action/");
 String st=loc+String("status");
 int stat=Firebase.getInt(st);
 if(stat)
 {
  String no=loc+String("node");
  int node=Firebase.getInt(no);
  String us=loc+String("user");
  int user=Firebase.getInt(us);
  String ph=loc+String("phase");
  int phase=Firebase.getInt(ph);
  String ac=loc+String("act");
  char action=Firebase.getInt(ac);
  Serial.println(node);
  Serial.write("S");
  Serial.write(node);
  Serial.write(action);
  Serial.write(user);
 // Serial.write(phase);
  stat=0;
 }
}
  /*
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
  */
