const socket = io()

// Nodos
const text =  document.getElementById('text')
const btn =  document.getElementById('btn')

socket.on('welcome', (data)=>{
  text.innerText = data;
})
btn.addEventListener('click', ()=>{
  socket.emit('sendBtn', 'Presionaron el botón OH MY GOD')
})

socket.on('everyone', (data)=>{
  console.log(data);
})