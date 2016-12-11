$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var count = $('#count');

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    var connectedUsers = function(number){
        count.empty();
        count.append('<div>').html(number);
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        addMessage(message);
        socket.emit('message', message);
        input.val('');
    });
    socket.on('message', addMessage);
    socket.on('entered', addMessage);
    socket.on('totalTally', connectedUsers);
    socket.on('closed', connectedUsers);
    socket.on('minusOne', addMessage);
});

