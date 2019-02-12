var map;
var userdata;
var blackout,bdata;
var Transformer,Substation,dataset;
var icon=['http://maps.google.com/mapfiles/kml/paddle/S.png','blue.JPG','green.JPG','black.JPG']
icon.push('http://maps.google.com/mapfiles/kml/paddle/S.png')
firebase.database().ref('/Users_Database/').on("value",function(snapshot){
  userdata=snapshot.val()
  for(var i in userdata)
  {
    var j=userdata[i];
    findcord(j.address,2)
  }
})
firebase.database().ref('/Transformer/').on("value",function(snapshot){
    Transformer=snapshot.val()
    for(var i in Transformer)
    {
      var j=Transformer[i];
      console.log(j.location)
      findcord(j.location,1)
    }
  })
  firebase.database().ref('/nodes/').on("value",function(snapshot){
    dataset=snapshot.val()
    for(var i in dataset)
    {
        var j=dataset[i];
        blackout=i;
     for( k in j)
     {
        var l=j[k];
        blackout=blackout+k;
         if(l.voltage==0)
         {
            
            firebase.database().ref('/Users_Database/'+blackout+'/').once("value",function(snapshot){
                bdata=snapshot.val();
                findcord(bdata.address,3)
            }) 
         }
         else
         {
            firebase.database().ref('/Users_Database/'+blackout+'/').once("value",function(snapshot){
                bdata=snapshot.val();
                findcord(bdata.address,2)
            })
         }
         blackout=i;
     }
    }
  })
  firebase.database().ref('/Substation/').on("value",function(snapshot){
    Substation=snapshot.val()
    for(var i in Substation)
    {
      var j=Substation[i];
      console.log(j.location)
      findcord(j.location,0)
    }
  })
    function addmarker(cords,no)
    {
        var marker=new google.maps.Marker({
            position:cords,
            map:map,
            icon:icon[no]
        })  

    }

function findcord(address,num){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            cords={lat:latitude,lng:longitude}
            addmarker(cords,num)
            } 
        }); 
}

function initMap()
{
    var options={
        zoom:13,
        center:{lat:29.9476,lng: 76.8155}
    }
    map=new google.maps.Map(document.getElementById("map"),options);
}
