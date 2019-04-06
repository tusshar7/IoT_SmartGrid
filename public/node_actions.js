$(function()
{
    var d,i,j,a,b,c,node,user,equip,id;
    $.get("/node_actions",function(data)
{
    console.log(data);
    d=data;
     i=data.slice(0,1);
     j=data.split(i)[1];
    if(i=='S')
    {
    $('#info').append('<h2>'+ "Selected Substation ID:" + j+'</h2>');
    equip='S';
    node=0;
    user=0;
    id=j;
    firebase.database().ref('/Substation/'+id+'/').once("value",function(snapshot){
        var snap=snapshot.val();
        var l=snap.location;
        $('#info').append('<h2>'+"Location:"+snap.location+'</h2>');
        $('#info').append('<h2>'+'Voltage Input:'+snap.voltage_input+'</h2>');
        $('#info').append('<h2>'+'Power Input:'+snap.power_input+'</h2>');
        $('#info').append('<h2>'+'Parent Node:'+snap.parent_node+'</h2>');
    })
    }
    else if(i=='T')
    {
    $('#info').append('<h2>'+ "Selected Transformer ID:" + j + '</h2>');
    equip='T';
    node=0;
    user=0;
    id=j;
    firebase.database().ref('/Transformer/'+id+'/').once("value",function(snapshot){
        var snap=snapshot.val();
        var l=snap.location;
        $('#info').append('<h2>'+"Location:"+snap.location+'</h2>');
        $('#info').append('<h2>'+'Rating:'+snap.rating+'</h2>');
        $('#info').append('<h2>'+'Ib Rated:'+snap.ib+'</h2>');
        $('#info').append('<h2>'+'Ir Rated:'+snap.ir+'</h2>');
        $('#info').append('<h2>'+'Iy Rated:'+snap.iy+'</h2>');
    })
   }
    else if(i=='N'){
    $('#info').append('<h1>'+ "Selected Node ID:" + j + '</h1>');
    equip=0;
    node=j;
    user=0; 
    id=0;
    firebase.database().ref('/nodes_static/'+node+'/').once("value",function(snapshot){
        var snap=snapshot.val();
        var l=snap.location;
        $('#info').append('<h2>'+"Location:"+snap.location+'</h2>');
        $('#info').append('<h2>'+'Phase:'+snap.phase+'</h2>');
        $('#info').append('<h2>'+'Parent Node:'+snap.parentid+'</h2>');
        $('#info').append('<h2>'+'Rating:'+snap.rating+'</h2>');
    })
    firebase.database().ref('/PowerAtNodes/'+node+'/').once("value",function(snapshot){
        var snap=snapshot.val();
        var l=snap.location;
        var theft=snap.Actual_Power-snap.Total_Power;
        $('#info').append('<h2>'+"Actual Power:"+snap.Actual_Power+'</h2>');
        $('#info').append('<h2>'+'Total Power:'+snap.Total_Power+'</h2>');
        $('#info').append('<h2>'+'Theft:'+theft+'</h2>');
    })
   }
    else
    {
         a=data.split("N")[0];
         b=data.split("N")[1];
         c=a.split("U")[1];
        $('#info').append('<h2>'+ "Selected User ID:" + c + " Of Node ID:"+b+ '</h2>');
    equip=0;
    user=c;
    node=b;
    id=0;
    }
})
 let on=$('#on');
 let off=$('#off');
 on.click(function()
{
    
    firebase.database().ref('/action/').set
    ({
       command:1,
       stat:1,
       node:node,
       user:user,
       equip:equip,
       id:id
    })
    window.alert("Power On Instruction Send!!");
})
off.click(function()
{
    firebase.database().ref('/action/').set
    ({
       command:0,
       stat:1,
       node:node,
       user:user,
       equip:equip,
       id:id
    })
    window.alert("Power Off Instruction Send!!");
})
})