const express = require('express');
const { createServer } = require('http');
const path = require('path');
const { Server } = require('socket.io');
// Se crea un server de websockets a través de un server http

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer); //Creado el server de websockets

// Servimos archivos estáticos
app.use(express.static(path.join(__dirname, 'views')));
const socketsOnline = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})
// Escuchando peticiones con websockets
io.on('connection', socket => {
  socket.connectedRoom = '';

  
  socket.on('connectToRoom', (room) => {
    socket.leave(socket.connectedRoom);
    // Se verifica a qué sala nos vamos a conectar. Inicialmente estamos conectados a la sala global
    switch (room) {
      case 'room1':
        socket.join(room);
        socket.connectedRoom = room;

        break;

      case 'room2':
        socket.join(room);
        socket.connectedRoom = room;

        break;

      case 'room3':
        socket.join(room);
        socket.connectedRoom = room;

        break;

      default:
        break;
    }

  })

  socket.on('message', (message)=>{
    const room = socket.connectedRoom;
    io.to(room).emit('sendMessage', {
      message,
      room
    })
  })
})

httpServer.listen(3000, () => {
  console.log('Escuchando en el puerto 3000 🚀');
})