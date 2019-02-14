var map;
var userdata,ud;
var flightPath;
var substation_cords=[];
var users_stat=[];
var nodes_cords=[];
var trans_cords=[];
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
    for(var i in ns)
    {
        var j=ns[i];
        nodes_cords[i]={lat:j.lat,lng:j.lng};
    }
  })
setInterval(function(){firebase.database().ref('/Transformer/').on("value",function(snapshot){
    var Transformer=snapshot.val()
    for(var i in Transformer)
    {  
        var j=Transformer[i];
         var sub=j.subid
        addmarker({lat:j.lat,lng:j.lng},1)
        makeline('green',[{lat:j.lat,lng:j.lng},substation_cords[sub]]);
    }
  })},2000)
  firebase.database().ref('/nodes/').on("value",function(snapshot){
    var nodes_dynamic=snapshot.val()
    for(var i in nodes_dynamic)
    {  
        var j=nodes_dynamic[i];
        for(var k in j)
        {
            var l=j[k];var index=i+'-'+k;
            console.log(index)
            if(l.voltage==0)
            {
                users_stat[index]={color:'black'}
            }
            else if(l.power>100)
            {
               users_stat[index]={color:'red'}
            }
            else
            {
                users_stat[index]={color:'green'}
            }
            // console.log(users_stat[index].color)
        }
    }
  })
setInterval(function(){firebase.database().ref('/Users_Database/').on("value",function(snapshot){
   var dataset=snapshot.val()
   for(var i in dataset)
   {
       var j=dataset[i];
       addmarker({lat:j.lat,lng:j.lng},2)
       var k=i.split("-")[0];
       var l=i.split("-")[1];
       makeline(users_stat[i].color,[nodes_cords[k],{lat:j.lat,lng:j.lng}])
   }
})},2000)
  setInterval(function(){firebase.database().ref('/Substation/').on("value",function(snapshot){
    var Substation=snapshot.val()
    for(var i in Substation)
    {
      var j=Substation[i];
      addmarker({lat:j.lat,lng:j.lng},0)
    }
  })},2000)
  setInterval(function(){firebase.database().ref('/nodes_static/').once("value",function(snapshot){
    var nodes=snapshot.val()
    for(var i in nodes)
    {
      var j=nodes[i];
      addmarker({lat:j.lat,lng:j.lng})
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
    function addmarker(cords,no)
    {
        var marker=new google.maps.Marker({
            position:cords,
            map:map,
            icon:icon[no]
        })  
    //   makeline()
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
