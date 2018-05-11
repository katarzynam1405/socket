var express = require('express');
var socket = require('socket.io');

var app = express();

var server = app.listen(4000, function() {
  console.log('listen to request on port 4000');
});


app.use(express.static('public'));

var io = socket(server);

io.on('connection', function(socket) {
  console.log('made socket connection', socket.id);

  socket.on('chat', function(data) { //when frontend emit chat event
    io.sockets.emit('chat', data); //emit for all client in socket some data
  })

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data);
  })
})
