const express = require('express')
const path = require('path')
const cors=require('cors')
const socketio = require('socket.io')
const http = require('http')
const app = express();
const server = http.createServer(app)
const io = socketio(server)
app.use(express.static('public'));
io.on('connection',function(socket){
    console.log('socket connected',socket.id);
    socket.on('data',(data)=>
{
    console.log(data.user)
    console.log(data.node)
    console.log(data.action)
});
});
app.use('/user_data',express.static('public/userdata.html'))
app.use('/user_details',express.static('public/showuser.html'))
app.use('/transformer_status',express.static('public/transdata.html'))
app.use('/add_trans',express.static('public/add_trans.html'))
app.use('/node_status',express.static('public/nodestat.html'))
app.get('/showgraph',function(req,res){
    res.sendFile(path.join(__dirname+'/public/showgraph.html'))
})
app.use('/showmap',express.static('public/showmap.html'))
app.use('/add_substation',express.static('public/substation_static.html'))
server.listen(4000, () => console.log('Website open on http://localhost:2345'))