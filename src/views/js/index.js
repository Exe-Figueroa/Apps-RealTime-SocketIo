const socket = io()

// Nodos
const text =  document.getElementById('text')
const btn =  document.getElementById('btn')
const greetingBtn =  document.getElementById('greeting')

socket.on('welcome', (data)=>{
  text.innerText = data;
})
btn.addEventListener('click', ()=>{
  socket.emit('sendBtn', 'Presionaron el botón OH MY GOD')
})

socket.on('everyone', (data)=>{
  console.log(data);
})

greetingBtn.addEventListener('click', ()=>{
  socket.emit('greetingLast', 'Hola bienvenido al server')
})

socket.on('greeting', (data)=>{
  alert(data)
})

// on, once y off

socket.on('on', ()=>{
  console.log('Evento que se emite varias veces ');
})
socket.once('once', ()=>{
  console.log('Evento que se emite una vez ');
})

const listener = ()=>{
  console.log('se apaga el evento');
}

socket.on('off', listener);

setTimeout(() => {
  socket.off('off', listener )
}, 1500);