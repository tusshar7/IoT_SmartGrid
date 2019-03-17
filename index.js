const express = require('express')
const path = require('path')
const cors=require('cors')
const socketio = require('socket.io')
const http = require('http')
const app = express();
var phoneNo=[];
var number;
var total_nodes=0;
var childatnodes=[];
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
app.use(express.json())
app.use(express.urlencoded({extended: true}))
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
app.get('/node_actions',function(req,res)
{
    console.log("jell"+number);
    res.send(number);
})
app.post('/node_actions',function(req,res)
{
    let d=req.body.node_num;
    console.log(d);
    number=d;
    res.send("received");
})
// app.get('/node_actions',)
server.listen(3000, () => console.log('Website open on http://localhost:2345'))
firebase.database().ref('/Users_Database/').on("value",function(snapshot){
var ph=snapshot.val();
for(var i in ph)
{
    var j=ph[i];
    phoneNo[i]=j.phone;
    console.log(j.phone)
}
})
firebase.database().ref('/Users_Database/').on("value",function(snapshot){
    var dataset=snapshot.val()
    for(var n=1;n<=total_nodes;n++)
   {
       var a=[];
    for(var i in dataset)
    {
        var k=i.split("-")[0];
        var l=i.split("-")[1];
        if(n==k)
        {
         a.push(l)
        }
    }
    childatnodes[n]=a;
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
           //  nexmo.message.sendSms('Server',phoneNo[index], text)
          }
          else if(l.VoltageA<=100&&l.LimitAmt!=0)
          {
            //message part for theft stoped
            var text='Theft Stopped!!'
            firebase.database().ref('/nodes/'+i+'/'+k+'/LimitAmt').set(0)
            //nexmo.message.sendSms('Server', phoneNo[index], text)
          }
          else if(l.VoltageA>100&&l.LimitAmt==0)
          {
              //message for theft begin
              var amt=l.VoltageA-100;
              var text='Theft Begin by amount:'+amt;
              firebase.database().ref('/nodes/'+i+'/'+k+'/LimitAmt').set(l.VoltageA-100)
             // nexmo.message.sendSms('Server',phoneNo[index],text)
          }
      }
  }
})
firebase.database().ref('/PowerAtNodes/').on("value",function(snapshot){
    var data=snapshot.val();
    for(var i in data)
    {
        var j=data[i];
        if(j.Total_Power-j.Actual_Power<0&&j.LimitAmt==0)
        {
            var amt=j.Actual_Power-j.Total_Power;
            //message part for begining of theft
           for(var m=0;m<childatnodes[i].length;m++)
           {
            var ind=i+'-'+childatnodes[i][m];
            var text="Theft Started in your locality by amount:"+amt;
           // nexmo.message.sendSms('Server',phoneNo[ind],text)
           }
    firebase.database().ref('/PowerAtNodes/'+i+'/'+'/LimitAmt').set(j.Actual_Power-j.Total_Power)
        }
        else if(j.Actual_Power-j.Total_Power-200>0&&j.LimitAmt!=0)
        {
            //for increment in theft
            var amt=j.Actual_Power-j.Total_Power;
            //message part for begining of theft
           for(var m=0;m<childatnodes[i].length;m++)
           {
            var ind=i+'-'+childatnodes[i][m];
            var text="Theft Increased in your locality by amount:"+amt;
            //nexmo.message.sendSms('Server',phoneNo[ind],text)
           }
  firebase.database().ref('/PowerAtNodes/'+i+'/'+'/LimitAmt').set(j.Actual_Power-j.Total_Power-j.LimitAmt)
        }
        else if(j.Actual_Power<=j.Total_Power)
        {
            //for stop in theft
            //message part for begining of theft
           for(var m=0;m<childatnodes[i].length;m++)
           {
            var ind=i+'-'+childatnodes[i][m];
            var text="Theft Stopped in your locality";
           // nexmo.message.sendSms('Server',phoneNo[ind],text)
           }
  firebase.database().ref('/PowerAtNodes/'+i+'/'+'/LimitAmt').set(0)
        }
    }
  })
  