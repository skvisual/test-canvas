const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
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
