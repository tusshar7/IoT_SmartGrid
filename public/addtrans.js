
$(function () {
    let trans_id=$('#trans_id')
    let location = $('#location')
    let pnode = $('#pnode')
    let cnode= $('#cnode')
    let rating = $('#rating')
    let ir = $('#ir')
    let iy= $('#iy')
    let ib= $('#ib')
    let date= $('#date')
    let sid= $('#sid')
    let subid= $('#subid')
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
    submit.click(function () {
        findcord(location.val())
        let tid=trans_id.val()
        setTimeout(function(){
        firebase.database().ref('/Transformer/'+tid).set({
            location:location.val(),
            pnode:pnode.val(),
            cnode:cnode.val(),
            rating:rating.val(),
            ir:ir.val(),
            iy:iy.val(),
            ib:ib.val(),
            date:date.val(),
            sid:sid.val(),
            subid:subid.val(),
            lng:longitude,
           lat:latitude
        })}
        ,3000)
    })
})