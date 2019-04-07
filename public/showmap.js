var map;
var userdata,ud;
var flightPath;
var total_nodes;
var substation_cords=[];
var users_stat=[];
var nodes_cords=[];
var trans_cords=[];
var nodes_child=[];
var node_power=[];
var nodes_users=[];
var blackout,bdata;
var icon=['http://maps.google.com/mapfiles/kml/paddle/S.png','blue.JPG','green.JPG','black.JPG','yello.JPG']
firebase.database().ref('/Substation/').on("value",function(snapshot){
  var subs=snapshot.val();
  for(var i in subs)
  {
      var j=subs[i];
      substation_cords[i]={lat:j.lat,lng:j.lng};
  }
})
firebase.database().ref('/Transformer/').on("value",function(snapshot){
    var trans=snapshot.val();
    for(var i in trans)
    {
        var j=trans[i];
        trans_cords[i]={lat:j.lat,lng:j.lng};
    }
  })
firebase.database().ref('/nodes_static/').on("value",function(snapshot){
    var ns=snapshot.val();
    var max=0;
    for(var i in ns)
    {
        var j=ns[i];
        nodes_cords[i]={lat:j.lat,lng:j.lng};
        if(i-max>=0)
        {
            max=i
        }
    }
    total_nodes=max;
    console.log(total_nodes)
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
  console.log(nodes_child)
})
setInterval(function(){firebase.database().ref('/Transformer/').on("value",function(snapshot){
    var Transformer=snapshot.val()
    for(var i in Transformer)
    {  
        var j=Transformer[i];
         var sub=j.subid;
         var par=j.pnode;
         var nod="T"+i;
        addmarker({lat:j.lat,lng:j.lng},1,nod)
        makeline('green',[{lat:j.lat,lng:j.lng},substation_cords[sub]]);
        makeline('green',[{lat:j.lat,lng:j.lng},nodes_cords[par]]);
    }
  })},2000)
  firebase.database().ref('/nodes/').on("value",function(snapshot){
    var nodes_dynamic=snapshot.val()
    for(var i in nodes_dynamic)
    {  
        var j=nodes_dynamic[i];
        for(var k in j)
        {
            var a={}
            var l=j[k];var index=i+'-'+k;
            console.log(index)
            a={voltage:l.voltage,power:l.power};
            if(l.voltage==0)
            {
                a.color='black';
                //users_stat[index]={color:'black'}
            }
            else if(l.power>100)
            {
                a.color='red';
            }
            else
            {
                a.color='green';
            }
            users_stat[index]=a;
            console.log(users_stat[index])
        }
    }
  })
setInterval(function(){firebase.database().ref('/Users_Database/').on("value",function(snapshot){
   var dataset=snapshot.val()
   for(var n=1;n<=total_nodes;n++)
  {
      var a=[];
   for(var i in dataset)
   {
       var j=dataset[i];
       var k=i.split("-")[0];
       var l=i.split("-")[1];
       var nod="U"+l+"N"+k;
       addmarker({lat:j.lat,lng:j.lng},2,nod)
       if(n==k)
       {
        a.push(l)
       }
       makeline(users_stat[i].color,[nodes_cords[k],{lat:j.lat,lng:j.lng}])
   }
   nodes_users[n]=a;
}
})},2000)
  setInterval(function(){firebase.database().ref('/Substation/').on("value",function(snapshot){
    var Substation=snapshot.val()
    for(var i in Substation)
    {
      var j=Substation[i];
      var nod="S"+i;
      var par=j.parent_node;
      addmarker({lat:j.lat,lng:j.lng},0,nod)
      makeline('green',[{lat:j.lat,lng:j.lng},nodes_cords[par]]);
    }
  })},2000)
  setInterval(function(){firebase.database().ref('/nodes_static/').once("value",function(snapshot){
    var nodes=snapshot.val()
    for(var i in nodes)
    {
      var j=nodes[i];
      var nod="N"+i;
      addmarker({lat:j.lat,lng:j.lng},undefined,nod)
      var parent=j.parentid
      var identify=parent.slice(0,1)
      if(identify=='T')
      {
         makeline('purple',[{lat:j.lat,lng:j.lng},trans_cords[parent.slice(1,2)]])

      }
      else
      { 
        makeline('green',[{lat:j.lat,lng:j.lng},nodes_cords[parent]])
      }
    }
  })},2000)
    function addmarker(cords,no,nod)
    {
        var marker=new google.maps.Marker({
            position:cords,
            map:map,
            icon:icon[no],
            url:'http://localhost:3000/node_actions.html',
            node:nod
        })  
    google.maps.event.addListener(marker,'click', function() {
        $.post('/node_actions',{node_num:this.node},function(data)
    {
     console.log(data);
     window.alert("Requesting....Click Okay")
    });
    let url=this.url;
    setTimeout(function(){window.location.href = url;},3000);
    });
    }
   
function makeline(color,coordinates)
{
    // console.log(coordinates)
    flightPath=new google.maps.Polyline({
         geodesic: false,
        strokeColor: color,
        strokeOpacity: 0.5,
        map:map,
        editable:false,
        strokeWeight: 1,
        path:coordinates
    })
}
function initMap()
{
    var options={
        zoom:13,
        center:{lat:29.9476,lng: 76.8155}
    }
    map=new google.maps.Map(document.getElementById("map"),options);
    //  flightPlanCoordinates=[{lat:29.9476,lng:76.8155},{lat:29.9607,lng:76.8909}]
    //    flightPath = new google.maps.Polyline({
    //     path: flightPlanCoordinates,
    //     geodesic: true,
    //     strokeColor: 'green',
    //     strokeOpacity: 1.0,
    //     map:map,
    //     strokeWeight: 2
    //   });
}
