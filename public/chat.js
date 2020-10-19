$(document).ready(function(){
    var socket = io.connect('http://localhost:4000')
    var username = $("#username")
    var change_username = $("#change_username")
    var feedback = $("#feedback")
    var message = $("#message")
    var change_message = $("#change_message")
    var typing = $("#typing")

    change_message.click(function(){
        
        socket.emit('new_message',{message:message.val()})
        
    })

    socket.on('new_message',(data)=>{
        message.val('')
        typing.html('')
        feedback.append('<p>' + data.username + ":" + data.message + '</p>')
    })

    change_username.click(function(){
        socket.emit('change_username',{username:username.val()})
    })

    message.bind('keypress', ()=>{
        socket.emit('typing')
    })

    socket.on('typing',(data)=>{
        typing.html('<i>' + data.username + " is typing" + '</i>')
    })

})