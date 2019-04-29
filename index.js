const express = require('express')
const path = require('path')
const cors=require('cors')
const socketio = require('socket.io')
const http = require('http')
const app = express();
var phoneNo=[];
var staffph=[];
var node_staff=[];
var number;
 var total_nodes;
var node_power=[];
var user_powers=[];
var childatnodes=[];
var nodes_child=[];
var phase_info=[];
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
app.use('/staff',express.static('public/staff.html'))
app.use('/user_details',express.static('public/showuser.html'))
app.use('/transformer_status',express.static('public/transdata.html'))
app.use('/add_trans',express.static('public/add_trans.html'))
app.use('/node_status',express.static('public/nodestat.html'))
app.use('/remove',express.static('public/removeuser.html'))
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
firebase.database().ref('/nodes_static/').on("value",function(snapshot){
 var snap=snapshot.val();
 for(var i in snap)
 {
     var j =snap[i];
     node_staff[i]=j.staff;
 }
})
app.post('/staff',function(req,res)
{
    let id=req.body.ID;
    let name=req.body.name;
    let phone=req.body.phone;
    let address=req.body.address;
    let email=req.body.email;
    let theft=req.body.theft;
    res.send("done");
    staffph[id]=phone;
    firebase.database().ref('/Staff').set
   ({
       id:id,
       name:name,
       number:phone,
       email:email,
       theft:theft,
       address:address
   })
})
server.listen(process.env.PORT||5000,"0.0.0.0")
firebase.database().ref('/Users_Database/').on("value",function(snapshot){
var ph=snapshot.val();
for(var i in ph)
{
    var j=ph[i];
    phoneNo[i]=j.phone;
    phase_info[i]=j.phase;
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
    console.log(n+"kechilds"+childatnodes[n])
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
        user_powers[index]=l.load;
          if(l.load>100&&l.load-100-l.LimitAmt>200&&l.LimitAmt!=0)
          {
             //message part for theft increase;
             var amt=l.load-100-l.LimitAmt;
             var text='Theft Increased by:'+amt;
             firebase.database().ref('/nodes/'+i+'/'+k+'/LimitAmt').set(l.load-l.LimitAmt)
             console.log(text)
           //  nexmo.message.sendSms('Server',phoneNo[index], text)
          }
          else if(l.load<=100&&l.LimitAmt!=0)
          {
            //message part for theft stoped
            var text='Theft Stopped!!'
            firebase.database().ref('/nodes/'+i+'/'+k+'/LimitAmt').set(0)
            console.log(text);
            //nexmo.message.sendSms('Server', phoneNo[index], text)
          }
          else if(l.load>100&&l.LimitAmt==0)
          {
              //message for theft begin
              var amt=l.load-100;
              var text='Theft Begin by amount:'+amt;
              firebase.database().ref('/nodes/'+i+'/'+k+'/LimitAmt').set(l.load-100)
              console.log(text);
             nexmo.message.sendSms('Server',phoneNo[index],text)
          }
      }
  }
})
  firebase.database().ref('/nodes_static/').on("value",function(snapshot){
    let tot=snapshot.val();
    var count=0;
    for(var i in tot)
    {
        count=count+1;
    }
    total_nodes=count;
    firebase.database().ref('/total_nodes/').set(total_nodes)
  })
  firebase.database().ref('/nodes_static/').on("value",function(snapshot){
    for(var n=1;n<=total_nodes;n++)
    {
     var childs=snapshot.val()
     var a=[];
      for(var i in childs)
      {
          var j=childs[i];
          if(j.parentid==n)
          {
            a.push(i)
          }
      }
      nodes_child[n]=a;
    }
  })
  setInterval(function(){
    for(var i=total_nodes;i>0;i--)
    {
        var power=0;
        for(var m=0;m<childatnodes[i].length;m++)
        { 
            var k=i+'-'+childatnodes[i][m];
           power=user_powers[k]+power;  
        }
        for(var m=0;m<nodes_child[i].length;m++)
        {
            power=power+node_power[nodes_child[i][m]];
        }
        node_power[i]=power;
        firebase.database().ref('/PowerAtNodes/'+i+'/Total_Power/').set(power);
    }
},1000)
firebase.database().ref('/PowerAtNodes/').on("value",function(snapshot){
    var data=snapshot.val();
    for(var i in data)
    {
        var j=data[i];
        if(j.Total_Power-j.Actual_Power<0&&j.LimitAmt==0)
        {
           console.log("Theft Started");
            var staff_id=node_staff[i];
           var staff_no=staffph[staff_id];
            var amt=j.Actual_Power-j.Total_Power;
            var text="Theft Started in your locality by amount:"+amt;
            //message to staff
            //nexmo.message.sendSms('Server',staff_no,text)
            //message part for begining of theft
           for(var m=0;m<childatnodes[i].length;m++)
           {
            var ind=i+'-'+childatnodes[i][m];
           
           // nexmo.message.sendSms('Server',phoneNo[ind],text)
           }
    firebase.database().ref('/PowerAtNodes/'+i+'/'+'/LimitAmt').set(j.Actual_Power-j.Total_Power)
        }
        else if(j.Actual_Power-j.LimitAmt-j.Total_Power-200>0&&j.LimitAmt!=0)
        {
            //for increment in theft
            console.log("Theft Increased");
            var staff_id=node_staff[i];
           var staff_no=staffph[staff_id];
            var amt=j.Actual_Power-j.Total_Power;
            var text="Theft Increased in your locality by amount:"+amt;
             //message to staff
            //nexmo.message.sendSms('Server',staff_no,text)
           for(var m=0;m<childatnodes[i].length;m++)
           {
            var ind=i+'-'+childatnodes[i][m];
           
            //nexmo.message.sendSms('Server',phoneNo[ind],text)
           }
  firebase.database().ref('/PowerAtNodes/'+i+'/'+'/LimitAmt').set(j.Actual_Power-j.Total_Power-j.LimitAmt)
        }
        else if(j.Actual_Power<=j.Total_Power&&j.LimitAmt!=0)
        {
            //for stop in theft
            console.log("theft stopped");
            var staff_id=node_staff[i];
           var staff_no=staffph[staff_id];
           var text="Theft Stopped in your locality";
            //message to staff
            //nexmo.message.sendSms('Server',staff_no,text)
           for(var m=0;m<childatnodes[i].length;m++)
           {
            var ind=i+'-'+childatnodes[i][m];
           
           // nexmo.message.sendSms('Server',phoneNo[ind],text)
           }
  firebase.database().ref('/PowerAtNodes/'+i+'/'+'/LimitAmt').set(0)
        }
    }
  })
  /*
  let promise1;
  setInterval(function(){
  firebase.database().ref('/nodes/').once("value",function(snapshot){
      var loadbalance=snapshot.val()
      var flag=0;
      for(var i in loadbalance)
      {
        var toshift=-1;
        var fromshift=-1;
        var j=loadbalance[i];  
        for(var k in j)
          {
            var ind=i+'-'+ k;  
            console.log(ind);
            var l=j[k];
            var from_user,to_user;
              var powA=l.CurrentA*l.VoltageA;
              var powB=l.CurrentB*l.VoltageB;
              var powC=l.CurrentC*l.VoltageC;
              console.log(powA);
              console.log(powB);
              console.log(powC);
              var max=-1,min=-1;var val_max,val_min;
              if(powA>powB&&powA>powC)
              {
                  max=1;val_max=powA;from_user=ind;
              }
              else if(powB>powC&&powB>powA)
              {
                  max=2;val_max=powB;from_user=ind;
              }
              else if(powC>powA&&powC>powB)
              {
                  max=3;val_max=powC;from_user=ind;
              }
              else if(powA<powB&&powA<powC)
              {
                  min=1;val_min=powA;to_user=ind;
              }
              else if(powB<powC&&powB<powA)
              {
                  min=2;val_min=powB;to_user=ind;
              }
              else if(powC<powA&&powC<powB)
              {
                  min=3;val_min=powC;to_user=ind;
              }
              if(phase_info[ind]==1)
              {
                if(fromshift==-1)
                fromshift=max;
                console.log(fromshift);
              }
              else if(phase_info[ind]==3)
              {
                if(toshift==-1)  
                toshift=min;
                console.log(toshift)
              }
             if(fromshift!=-1&&toshift!=-1&&fromshift!=toshift)
             {
                var a=from_user.split("-")[0];
                var b=from_user.split("-")[1];
                firebase.database().ref('/action/').set({
                    command:0,
                    node:a,
                    user:b,
                    stat:1,
                    phase:fromshift,
                    sensor:fromshift
                }) 
                checking(from_user,to_user,toshift)
                flag=1;
            }
            if(flag==1)break;
          }
          if(flag==1)break;
      }
  })},7000)
  function checking(from_user,to_user,toshift)
  {
    var z=[];
    z.push(to_user);
    z.push(toshift);
    var a=from_user.split("-")[0];
    var b=from_user.split("-")[1];
    firebase.database().ref('/nodes/'+a+'/'+b+'/').on("value",function(snapshot){
     var l=snapshot.val();
     promise1 = new Promise( (resolve, reject) => {
         console.log(l.load);
        if(l.load<5)
        {
            dataReceivedSuccessfully=true;
            console.log("jfihd0");
        } 
        else
        {
            dataReceivedSuccessfully=false;
        }
        
        if (dataReceivedSuccessfully) 
          resolve(z); 
        
        if (!dataReceivedSuccessfully) 
          reject('Data Corrupted!'); 
        
        }) 
        promise1.then( (z) => {
            console.log("sadbab");
            var c=z[0].split("-")[0];
            var d=z[0].split("-")[1];
            var sensor;
            console.log(toshift);
            if(z[1]==1||z[1]==2)sensor=4;
            if(z[1]==3||z[1]==2)sensor=5;
            console.log(sensor);
            setTimeout(function(){
            firebase.database().ref('/action/').set({
                command:0,
                node:c,
                user:d,
                sensor:sensor,
                stat:1,
                phase:z[1]
            })},3000)
        })
        promise1.catch( (message) => {
           console.log(message);
        })
    })
  }
  */
 
