const socket = io()

const checkSocketStatus = ()=>{
  console.log(`Estado del socket: ${socket.connected}`);
}

socket.on('connect', ()=>{
  checkSocketStatus();
  console.log(`El socket => ${socket.id} se ha conectado`);
})

socket.on('connect_error', ()=>{
  console.log('Connection error');
})

socket.on('disconnect', ()=>{
  checkSocketStatus();
  console.log(`El socket => ${socket.id} se ha desconectado`);
})

// Accedemos al engine para ver los eventos de reconección 
socket.io.on('reconnect_attempt', ()=>{
  console.log('Me estoy reconnectanding');
})

socket.io.on('reconnect', ()=>{
  console.log('Reconnected');
})