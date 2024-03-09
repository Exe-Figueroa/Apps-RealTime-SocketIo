const express = require('express');
const { createServer } = require('http');
const path = require('path');
const { Server } = require('socket.io');
// Se crea un server de websockets a través de un server http

const app = express();
const httpServer =  createServer(app);
const io = new Server(httpServer); //Creado el server de websockets

// Servimos archivos estáticos
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/views/index.html')
})
// Escuchando peticiones con websockets
io.on('connection', socket => {
  console.log('Socket => ',socket.id);
})

httpServer.listen(3000, ()=>{
  console.log('Escuchando en el puerto 3000 🚀 (La vieja confiable)');
})