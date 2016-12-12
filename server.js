var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);
var tally = 0;


var users = {};

/*		socket.io		*/
io.on('connection', function (socket) {
    console.log('Client connected');
    ++tally;
    io.emit('totalTally', tally);
    io.emit('entered','New Chatter has entered');

    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', function(){
    	console.log('One got away');
    	io.emit('minusOne', 'Someone is too busy to chat')
    	--tally;
    	io.emit('closed', tally);

    });

});




server.listen(process.env.PORT || 8080);