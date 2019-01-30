
$(function () {
    let trans_id = $('#transformer_id')
    let submit=$('#Submit')
    let table=document.getElementById("table")
     var data;
     var rpwr,tpwr,rlpwr,vy,vr,vb,ir,iy,ib,status;
    submit.click(function () {
     let id=trans_id.val()
            firebase.database().ref('/Transformer/'+id).on("value",function(snapshot){
             data=snapshot.val();
            console.log(data);
               rpwr=data.rpwr;  
               tpwr=data.tpwr;
               vy=data.vy;
               vr=data.vr;
               vb=data.vb;
               ir=data.ir;
               iy=data.iy;
               ib=data.ib;
               status=data.status;
               rlpwr=data.rlpwr;
               
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
        c1.innerHTML =id;
        c2.innerHTML =new Date().toLocaleDateString();
        c3.innerHTML=new Date().toLocaleTimeString();
        c4.innerHTML=tpwr;
        c5.innerHTML=rlpwr;
        c6.innerHTML=rpwr;
        c7.innerHTML=status;
        c8.innerHTML=vr;
        c9.innerHTML=vy;
        c10.innerHTML=vb;
        c11.innerHTML=ir;
        c12.innerHTML=iy;
        c13.innerHTML=ib;
    })
})