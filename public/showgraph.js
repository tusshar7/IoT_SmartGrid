
// window.onload = function () {
  $(function () {
    let limits=$('#limits')
  let submit=$('#submit');
  submit.click( function() {
    let counter;
    let powerlimit;
    let user=$('#user').val();
  console.log(user);
    let node=user.slice(0,2)
    let userno=user.slice(2,4)
  var dps = []; // dataPoints
  let chartContainer=document.getElementById("chartContainer")
  var chart = new CanvasJS.Chart("chartContainer", {
    title :{
      text: "Power Info Of User:"+user,
    },
    axisX:{
      title: "time",
      gridThickness: 2,
      interval:2, 
      intervalType:"seconds",
      valueFormatString: "hh:mm", 
    },
    axisY: {
      includeZero: true,
      title:"power"
    },      
    data: [{
      type: "line",
      dataPoints: dps
    }]
  });
  var dataLength = 100; // number of dataPoints visible at any point
  
  var updateChart = function (count) {
    var userdata;
    var j=0;
    // count = count || 1;
     firebase.database().ref('/nodes/'+node+'/'+userno).once("value",function(snapshot){
      userdata=snapshot.val()
      if(userdata==null&&j==0)
      {
        window.alert("No Such User!!")
      }
      while(j<count){
        let time ={
         hh:new Date().getHours(),
         mm:new Date().getMinutes()}
      dps.push({
        x: new Date(),
        y: userdata.power
      });
      j++;
      if(userdata.power>100&&powerlimit!=userdata.power&&counter!=time.hh+time.mm)
      {
        // window.alert("Limit Exceeded at time:"+ time.hh+":"+time.mm)
        limits.append("<li>" + "Limit Exceeded at time:"+ time.hh+":"+time.mm + "</li>")
        counter=time.hh+time.mm
        powerlimit=userdata.power
      }
    }
     })
  
    if (dps.length > dataLength) {
      dps.shift();
    }
    chart.render();
  };
  console.log(dps)
  updateChart(5);
  setInterval(function(){updateChart(5)},1000);
})
  })