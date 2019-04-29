$(function () {
    let nodeid = $('#node_id')
    let submit=$('#Submit')
    let graph=$('#graph')
    let table=document.getElementById("table")
     var userdata;
     var rpwr,tpwr,ithd,vy,vr,vb,ir,iy,ib,energy,pf;
     var load;
    submit.click(function () {
     let node_id=nodeid.val()
     let node=node_id.split("-")[0];
     let user=node_id.split("-")[1];
     console.log(node_id);
     console.log(user);
            firebase.database().ref('/nodes/'+node+'/'+user+'/').once("value",function(snapshot){
                userdata=snapshot.val();
            console.log(userdata);
            if(userdata!=null){
               rpwr=userdata.rpwr;
               load=userdata.load;    
               tpwr=userdata.tpwr;
            //    energy=userdata.energy; 
               vy=userdata.VoltageB;
               vr=userdata.VoltageA;
               vb=userdata.VoltageC;
               ir=userdata.CurrentA;
               iy=userdata.CurrentB;
               ib=userdata.CurrentC;
            //    ithd=userdata.ithd;
               pfA=userdata.PowerFactorA;
               pfB=userdata.PowerFactorB;
               pfC=userdata.PowerFactorC;
            }
        })     
        setTimeout(function(){
        if(userdata!=null){
            if(pfC<0.9&&pfC>0.2)
               {
                 pfC=0.9;
               }
               rpwr=Math.sqrt(tpwr*tpwr-load*load).toPrecision(2);
               console.log(tpwr*tpwr-load*load);
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
        // c7.innerHTML=energy;
        // c8.innerHTML=ithd;
        c7.innerHTML=vr;
        c8.innerHTML=vy;
        c9.innerHTML=vb;
        c10.innerHTML=ir;
        c11.innerHTML=iy;
        c12.innerHTML=ib;
        c13.innerHTML=pfA;
        c14.innerHTML=pfB;
        c15.innerHTML=pfC;
        }
        else
        {
            window.alert("Invalid User ID")
        }
    },2000)
    })
    graph.click(function(){
        $.get('/showgraph')
    })
})
