
$(function () {
    let userid=$('#userid')
    let name = $('#name')
    let address = $('#address')
    let phone= $('#phone')
    let mail = $('#mail')
    let bill = $('#bill')
    let load= $('#load')
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
        findcord(address.val())
        let id=userid.val()
        setTimeout(function(){
        firebase.database().ref('/Users_Database/'+id+'/').set({
            name:name.val(),
            address:address.val(),
            phone:phone.val(),
            mail:mail.val(),
            bill:bill.val(),
            load:load.val(),
            lat:latitude,
            lng:longitude
        })}
        ,3000)
    })
    })