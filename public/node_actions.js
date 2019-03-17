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
    }
    else if(i=='T')
    {
    $('#info').append('<h2>'+ "Selected Transformer ID:" + j + '</h2>');
    equip='T';
    node=0;
    user=0;
    id=j;
   }
    else if(i=='N'){
    $('#info').append('<h2>'+ "Selected Node ID:" + j + '</h2>');
    equip=0;
    node=j;
    user=0; 
    id=0;
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