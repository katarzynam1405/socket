//make connection

var socket = io.connect('http://localhost:4000');

var message = document.querySelector('#message'),
    handle = document.querySelector('#handle'),
    btn = document.querySelector('#send'),
    output = document.querySelector('#output'),
    feedback = document.querySelector('#feedback');

//emit event

btn.addEventListener('click', function() {
  socket.emit('chat', { //emit to bakend event with data from inputs
    message: message.value,
    handle: handle.value
  });

  message.value = '';
  handle.value = '';
});

message.addEventListener('keypress', function() {
  socket.emit('typing', handle.value);
})


//listen for events
socket.on('chat', function(data) {
  output.innerHTML += '<p><strong>' + data.handle + '</strong>' + data.message + '</p>';
})

socket.on('typing', function(data) {
  feedback.innerHTML = '<p>' + data + ' is typing a message...</p>'
})
