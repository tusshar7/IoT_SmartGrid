const express = require('express')
const path = require('path')
const cors=require('cors')
const socketio = require('socket.io')
const http = require('http')
const app = express();
var phoneNo=[];
var firebase = require("firebase");
const config = {
    apiKey: "AIzaSyC8k4TtxNOwddFIXWjlNtxuz6pHY0puC5U",
    authDomain: "testing-2785b.firebaseapp.com",
    databaseURL: "https://testing-2785b.firebaseio.com",
    projectId: "testing-2785b",
    storageBucket: "testing-2785b.appspot.com",
    messagingSenderId: "746327974390"
  };
  firebase.initializeApp(config);
const server = http.createServer(app)
const io = socketio(server)
app.use(express.static('public'));
io.on('connection',function(socket){
    console.log('socket connected',socket.id);
    socket.on('data',(data)=>
{
    console.log(data.user)
    console.log(data.node)
    console.log(data.action)
});
});
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: '9bd2b412',
  apiSecret: '6aaTOt2fz0nxiP9k'
})
app.use('/user_data',express.static('public/userdata.html'))
app.use('/user_details',express.static('public/showuser.html'))
app.use('/transformer_status',express.static('public/transdata.html'))
app.use('/add_trans',express.static('public/add_trans.html'))
app.use('/node_status',express.static('public/nodestat.html'))
app.get('/showgraph',function(req,res){
    res.sendFile(path.join(__dirname+'/public/showgraph.html'))
})
app.use('/showmap',express.static('public/showmap.html'))
app.use('/add_substation',express.static('public/substation_static.html'))
app.use('/addnode',express.static('public/add_node.html'))
server.listen(4000, () => console.log('Website open on http://localhost:2345'))
firebase.database().ref('/Users_Database/').on("value",function(snapshot){
var ph=snapshot.val();
for(var i in ph)
{
    var j=ph[i];
    phoneNo[i]=j.phone;
    console.log(j.phone)
}
})
firebase.database().ref('/nodes/').on("value",function(snapshot){
  var data=snapshot.val();
  for(var i in data)
  {
      var j=data[i]
      for(var k in j)
      {
        var index=i+'-'+k;  
        var l=j[k];
          if(l.VoltageA>100&&l.VoltageA-100-l.LimitAmt>200)
          {
             //message part for theft increase;
             var amt=l.VoltageA-100-l.LimitAmt;
             var text='Theft Increased by:'+amt;
             firebase.database().ref('/nodes/'+i+'/'+k+'/LimitAmt').set(l.VoltageA-l.LimitAmt)
             console.log(text)
             nexmo.message.sendSms('Server',phoneNo[index], text)
          }
          else if(l.VoltageA<=100&&l.LimitAmt!=0)
          {
            //message part for theft stoped
            var text='Theft Stopped!!'
            firebase.database().ref('/nodes/'+i+'/'+k+'/LimitAmt').set(0)
            nexmo.message.sendSms('Server', phoneNo[index], text)
          }
          else if(l.VoltageA>100&&l.LimitAmt==0)
          {
              //message for theft begin
              var amt=l.VoltageA-100;
              var text='Theft Begin by amount:'+amt;
              firebase.database().ref('/nodes/'+i+'/'+k+'/LimitAmt').set(l.VoltageA-100)
              nexmo.message.sendSms('Server',phoneNo[index],text)
          }
      }
  }
})