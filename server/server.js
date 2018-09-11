const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var publicPath = path.join(__dirname, '../public');
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected!');

    // socket.emit('newEmail', {
    //     from: 'andrew@example.com',
    //     text: 'Hey. Welcome back',
    //     createdAt: 122323
    // });

    // socket.on('createEmail', (email) => {
    //     console.log('createEmail', email);
    // });

    socket.emit('newMessage', {
        from: 'Andrew',
        text: 'Let us meet up at 6 to discuss the updates',
        createdAt: 353365
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    })

    socket.on('disconnect', () => {
        console.log('Disconnected from client');
    });
})


server.listen(3000, () => {
    console.log('App is running on port 3000');
});
