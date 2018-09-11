const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var {generateMessage} = require('../public/js/utils/message');

var publicPath = path.join(__dirname, '../public');
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected!');

    // socket.emit('newMessage', {
    //     from: 'Andrew',
    //     text: 'Let us meet up at 6 to discuss the updates',
    //     createdAt: 353365
    // });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from client');
    });
})


server.listen(3000, () => {
    console.log('App is running on port 3000');
});
