let socket = io();
socket.on('connected', () => {
    console.log("Connected " + socket.id)
})
$(function () {
    let node = $('#node')
    let user = $('#user')
    let phase= $('#phase')
    let act = $('#action')
    let add = $('#add')
    let map= $('#map')
    add.click(function () {
        firebase.database().ref('/action').set({
            status:true,
            node:node.val(),
            user:user.val(),
            act:act.val(),
            phase:phase.val()
        });
    })
})