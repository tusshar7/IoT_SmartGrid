
$(function () {
    let userid=$('#userid')
    let name = $('#name')
    let address = $('#address')
    let phone= $('#phone')
    let mail = $('#mail')
    let bill = $('#bill')
    let load= $('#load')
    let submit=$('#submit')
    submit.click(function () {
        let id=userid.val()
        firebase.database().ref('/Users_Database/'+id+'/').set({
            name:name.val(),
            address:address.val(),
            phone:phone.val(),
            mail:mail.val(),
            bill:bill.val(),
            load:load.val(),
        });
    })
})