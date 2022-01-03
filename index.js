const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

// making  socket io connnection 
const io = require('socket.io')(http);

io.sockets.on('connection', function(socket){
    console.log('user connected ...');

    // broadcasting the message that come from browser
    socket.on('send-chat-message', (data) => {
        io.emit('chat-message', (data));        //  io. emit() to send a message to all the connected clients
        console.log(data);
    })

    socket.on('disconnect', () =>{
        console.log('user disconnected ...')
    })
})

http.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});