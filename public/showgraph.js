window.onload = function () {
  var dps = []; // dataPoints
  let chartContainer=document.getElementById("chartContainer")
  var chart = new CanvasJS.Chart("chartContainer", {
    title :{
      text: "Dynamic Data",
    },
    axisX:{
      title: "time",
      gridThickness: 2,
      interval:1, 
      intervalType:"hour",        
      valueFormatString: "hh:mm:ss TT", 
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
    count = count || 1;
     firebase.database().ref('/nodes/node01/user05').on("value",function(snapshot){
      userdata=snapshot.val()
      while(j<count){
      dps.push({
        x: new Date().toLocaleTimeString(),
        y: userdata.power
      });
      j++;
    }
     })
  
    if (dps.length > dataLength) {
      dps.shift();
    }
    chart.render();
  };
  console.log(dps)
  updateChart(dataLength);
  setInterval(function(){updateChart()},1000);
  
  }