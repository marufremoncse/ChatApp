
const express = require('express')

const app = express()
app.set("view engine", "ejs")
app.use(express.static('public'))
app.get('/', (req,res)=>{
    res.render('index')
})
const server = app.listen('4000', ()=>{
    console.log("Server is listening at 4000")
})


const io = require('socket.io')(server)

io.on('connection', (socket)=>{
    console.log("New User is Connected");

    socket.username = "New User"

    socket.on('new_message', (data)=>{
        io.sockets.emit('new_message',{message:data.message,username:socket.username})
    })
    socket.on('change_username', (data)=>{
        socket.username = data.username
    })
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',{username:socket.username})
    })
})