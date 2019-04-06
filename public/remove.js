$(function()
{
   let id= $('#id');
   let submit=$('#submit');
   submit.click(function(){
       let user=id.val();
       let n=id.split("-")[0];
       let i=id.split("-")[1];
  firebase.database().ref('/Users_Database/'+user).remove();
  firebase.database().ref('/nodes/'+n+'/'+i).remove();
 })

})