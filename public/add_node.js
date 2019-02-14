
$(function () {
    let node=$('#id')
    let threeph=$('#3ph')
    let singleph=$('#1ph')
    let staff=$('#staff')
    let customer=$('#customer')
    let location =$('#location')
    let pid=$('#parentid')
    let rating=$('#rating')
    let last=$('#last')
    let bill=$('#bill')
    let submit=$('#submit')
    function findcord(address){
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': address}, function(results, status) {
    
            if (status == google.maps.GeocoderStatus.OK) {
                 latitude = results[0].geometry.location.lat();
                 longitude = results[0].geometry.location.lng();
                console.log(latitude)
            }})    
    }
    var latitude,longitude;
    submit.click(function(){
        findcord(location.val())
        // console.log(data)
       let id=node.val();
       setTimeout(function(){
           console.log("yo")
       firebase.database().ref('/nodes_static/'+id).set({
           Three_Ph:threeph.val(),
           Single_Ph:singleph.val(),
           staff:staff.val(),
           customer_nearest:customer.val(),
           location:location.val(),
            lng:longitude,
           lat:latitude,
           parentid:pid.val(),
           rating:rating.val(),
           last_week_units:last.val(),
           bill:bill.val()
       })}
    ,3000)
    })
})