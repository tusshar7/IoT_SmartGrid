var map;
var userdata;
var Transformer,Substation;
var icon=[];
icon.push('http://maps.google.com/mapfiles/kml/paddle/S.png')
firebase.database().ref('/Users_Database/').on("value",function(snapshot){
  userdata=snapshot.val()
  for(var i in userdata)
  {
    var j=userdata[i];
    console.log(j.address)
    findcord(j.address,0)
  }
})
firebase.database().ref('/Transformer/').on("value",function(snapshot){
    Transformer=snapshot.val()
    for(var i in Transformer)
    {
      var j=Transformer[i];
      console.log(j.location)
      findcord(j.location,0)
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
            console.log(latitude)
            console.log(longitude)
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
