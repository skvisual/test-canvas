const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
  socket.on('name', ({ name }) => {
    
    io.emit('name', { name }) // emits lobby name to all connected sockets.
  })
})

  // io.on('connection', (socket) => {
  //   socket.join('room 237', () => {
  //     let rooms = Object.keys(socket.rooms);
  //     console.log(rooms); // [ <socket.id>, 'room 237' ]
  //   });
  // });

http.listen(4000, function() {
  console.log('listening on port 4000')
})
