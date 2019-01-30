var NodeGeocoder=require('node-geocoder')
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
    submit.click(function () {
        let tid=trans_id.val()
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
        });
    })
})