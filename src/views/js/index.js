const socket = io()

// Nodos para conectarse a las salas
const connectRoom1 = document.querySelector('#connectRoom1')
const connectRoom2 = document.querySelector('#connectRoom2')
const connectRoom3 = document.querySelector('#connectRoom3')

// Eventos de conección a las salas
connectRoom1.addEventListener('click', ()=>{
  socket.emit('connectToRoom', 'room1')
})

connectRoom2.addEventListener('click', ()=>{
  socket.emit('connectToRoom', 'room2')
})

connectRoom3.addEventListener('click', ()=>{
  socket.emit('connectToRoom', 'room3')
})

// Enviar mensajw

const sendMessageBtn = document.querySelector('#sendMessage');

sendMessageBtn.addEventListener('click', ()=>{
  const message = prompt('Escribe tu mensaje');
  socket.emit('message', message)
})

// Recibir el evento con el payload

socket.on('sendMessage', ({message, room})=>{
  const li = document.createElement('li');
  li.textContent = message;
  document.querySelector(`#${room}`).append(li);

})