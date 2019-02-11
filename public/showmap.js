var map;
var userdata;
var Transformer;
var addresses=[];
firebase.database().ref('/Users_Database/').on("value",function(snapshot){
  userdata=snapshot.val()
  for(var i in userdata)
  {
    var j=userdata[i];
    console.log(j.address)
    findcord(j.address,"user")
  }
})
firebase.database().ref('/Transformer/').on("value",function(snapshot){
    Transformer=snapshot.val()
    for(var i in Transformer)
    {
      var j=Transformer[i];
      console.log(j.location)
      findcord(j.location,"transformer")
    }
  })
function addmarker_user(cords)
    {
        var marker=new google.maps.Marker({
            position:cords,
            map:map
            // icon:'http://maps.google.com/mapfiles/kml/paddle/S.png'
        })  
    }
    function addmarker_substation(cords)
    {
        var marker=new google.maps.Marker({
            position:cords,
            map:map,
            icon:'http://maps.google.com/mapfiles/kml/paddle/S.png'
        })  
    }
    function addmarker_transformer(cords)
    {
        var marker=new google.maps.Marker({
            position:cords,
            map:map,
            icon:'http://maps.google.com/mapfiles/kml/paddle/S.png'
        })  
    }

function findcord(address,str){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            console.log(latitude)
            console.log(longitude)
            cords={lat:latitude,lng:longitude}
            if(str=="substation")
            {
             addmarker_substation(cords)
            }
            else if(str=="transformer")
            {
             addmarker_transformer(cords)
            }
            else if(str=="user")
            {
                addmarker_user(cords)
            }
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
    
    // addmarker({lat:29.9418,lng:76.8173})
}
