
$(function () {
  let id=$('#id')
  let pnode=$('#parentnode')
  let staffid=$('#staffid')
  let powerinp=$('#pratinginput')
  let voltageinp=$('#vratinginput')
  let out1=$('#out1')
  let out2=$('#out2')
  let out3=$('#out3')
  let loc=$('#location')
  let theft=$('#theft')
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
    findcord(loc.val())
   let subid=id.val()
   setTimeout(function(){
   firebase.database().ref('/Substation/'+subid+'/').set
   ({
      parent_node:pnode.val(),
      staffid:staffid.val(),
      power_input:powerinp.val(),
      voltage_input:voltageinp.val(),
      output_line1:out1.val(),
      output_line2:out2.val(),
      output_lint3:out3.val(),
      theft:theft.val(),
      location:loc.val(),
      lat:latitude,
      lng:longitude
    })}
    ,3000)
})
})