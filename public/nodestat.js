
$(function () {
    let nodeid = $('#node_id')
    let submit=$('#Submit')
    let table=document.getElementById("table")
     var userdata;
     var rpwr,tpwr,ithd,vy,vr,vb,ir,iy,ib,power,pf,theft;
    submit.click(function () {
     let node_id=nodeid.val()
            firebase.database().ref('/PowerAtNodes/'+node_id+'/').once("value",function(snapshot){
            userdata=snapshot.val();
            console.log(userdata);
            if(userdata!=null){
              theft=userdata.Actual_Power-userdata.Total_Power;
              vr=userdata.VoltageA;
              vy=userdata.VoltageB;
              vb=userdata.VoltageC;
              ir=userdata.CurrentA;
              iy=userdata.CurrentB;
              ib=userdata.CurrentC;
              power=userdata.Actual_Power;
            }
        })    
        setTimeout(function(){
        if(userdata!=null)
        { 
        var row=table.insertRow(1);
        var c1 = row.insertCell(0);
        var c2 = row.insertCell(1);
        var c3=row.insertCell(2);
        var c4=row.insertCell(3);
        var c5=row.insertCell(4);
        var c6=row.insertCell(5);
        var c7=row.insertCell(6);
        var c8=row.insertCell(7);
        var c9=row.insertCell(8);
        var c10=row.insertCell(9);
        var c11=row.insertCell(10);
        var c12=row.insertCell(11);
        var c13=row.insertCell(12);
        var c14=row.insertCell(13);
        var c15=row.insertCell(14);
        c1.innerHTML =nodeid.val();
        c2.innerHTML =new Date().toLocaleDateString();
        c3.innerHTML=new Date().toLocaleTimeString();
        c4.innerHTML=power;
        c5.innerHTML=vr;
        c6.innerHTML=vy;
        c7.innerHTML=vb;
        c8.innerHTML=ir;
        c9.innerHTML=iy;
        c10.innerHTML=ib;
        c11.innerHTML=ithd;
        c12.innerHTML=pf;
        c13.innerHTML=theft;
        c14.innerHTML=rpwr;
        c15.innerHTML=tpwr;
        }
        else
        {
            window.alert("Invalid Node");
        }
    },2000)
    })
})