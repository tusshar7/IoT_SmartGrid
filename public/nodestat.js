
$(function () {
    let nodeid = $('#node_id')
    let submit=$('#Submit')
    let table=document.getElementById("table")
     var userdata;
     var rpwr,tpwr,ithd,vy,vr,vb,ir,iy,ib,power,pf,theft;
    submit.click(function () {
     let node_id=nodeid.val()
            firebase.database().ref('/nodes/node'+node+'/user'+user).on("value",function(snapshot){
            userdata=snapshot.val();
            console.log(userdata);
               rpwr=userdata.rpwr;
               load=userdata.load;    
               tpwr=userdata.tpwr;
               energy=userdata.energy; 
               vy=userdata.vy;
               vr=userdata.vr;
               vb=userdata.vb;
               ir=userdata.ir;
               iy=userdata.iy;
               ib=userdata.ib;
               ithd=userdata.ithd;
               pf=userdata.pf;
        })     
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
        c4.innerHTML=load;
        c5.innerHTML=rpwr;
        c6.innerHTML=tpwr;
        c7.innerHTML=energy;
        c8.innerHTML=ithd;
        c9.innerHTML=vr;
        c10.innerHTML=vy;
        c11.innerHTML=vb;
        c12.innerHTML=ir;
        c13.innerHTML=iy;
        c14.innerHTML=ib;
        c15.innerHTML=pf;
    })
})