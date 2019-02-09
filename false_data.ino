
void setup() {
  Serial.begin(9600);
}
 
 
void loop() {
  Serial.write("S");
  Serial.write(1);
  Serial.write(5);
  Serial.write(25);
   Serial.write(30);
    Serial.write(42);
  
}
