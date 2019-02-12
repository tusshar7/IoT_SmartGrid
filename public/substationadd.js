
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
  submit.click(function(){
   let subid=id.val()
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
      location:loc.val()
   })
  })
})