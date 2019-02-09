
void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);
}
//assuming 3 pins foreach user int node_id=3;
int data[100][75];
int users=0;
int node_id=2;
int avl[15];
void loop() {
if(Serial1.available())
{  Serial.println(Serial1.read());
  if(Serial1.read()==83){
  int rec_id=Serial1.read();
  if(rec_id==node_id)
  {
    int inst=Serial1.read();
  if(inst==65)
    {
      users+=1;
      avl[Serial1.read()]=1;
    }
  else if(inst==82)
   {
    users-=1;
    avl[Serial1.read()]=0;
   }
  }
  else
  {
    Serial1.write(83);
    Serial1.write(rec_id);
    Serial1.write(Serial1.read());
    Serial1.write(Serial1.read());
  }
  Serial.println(rec_id);
  //Serial.println(inst);
  }
}

if(Serial.available()>5)
{
    if(Serial.read()==83){
    int row=Serial.read();
      Serial.write('S');
      Serial.write(row);
    int user=Serial.read();
      Serial.write(user);
    int V=Serial.read();
      Serial.write(V);
    int I=Serial.read();
      Serial.write(I);
    int P=Serial.read();
      Serial.write(P);
    int col=(user-1)*5;
    data[row][col++]=row;
    data[row][col++]=user;
    data[row][col++]=V;
    data[row][col++]=I;
    data[row][col++]=P;
   // Serial.println(row);
   // Serial.println(user);
    //Serial.println(V);
    }  
}/*
int user=1;
while(user!=15)
{ 
  if(avl[user]==1)
  {
    int pin=(user-1)*3+1;
    int a=analogRead(pin);
    pin++;
    int b=analogRead(pin);
    pin++;
    int c=analogRead(pin);
    int col=(user-1)*5;
    data[node_id][col++]=node_id;
    data[node_id][col++]=user;
    data[node_id][col++]=a;
    data[node_id][col++]=b;
    data[node_id][col++]=c;
    Serial.write(node_id);
    Serial.write(user);
    Serial.write(a);
    Serial.write(b);
    Serial.write(c);
  }
}*/
}
