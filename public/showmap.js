var map;
var userdata;
var addresses=[];
firebase.database().ref('/Users_Database/').on("value",function(snapshot){
  userdata=snapshot.val()
  console.log(userdata)
  for(var i in userdata)
  {
    var j=userdata[i];
    addresses.push(j.address)
    findcord(j.address)
  }
})
function addmarker(cords)
    {
        var marker=new google.maps.Marker({
            position:cords,
            map:map

        })  
    }

function findcord(address){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            console.log(latitude);
            console.log(longitude);
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
    
    addmarker({lat:29.9418,lng:76.8173})
    addmarker({lat:29.947636,lng:76.815473})
    
}
