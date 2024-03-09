const socket = io()

// Nodos
const circle = document.getElementById('circle');

const drawCircle = ({top, left})=>{
  circle.style.top = top;
  circle.style.left = left;
}

const drag = (e) => {

  const positions = {
    top: e.clientY + 'px',
    left: e.clientX + 'px',
  }

  drawCircle(positions)
  socket.emit('circlePosition', positions )
  
  
}
document.addEventListener('mousedown', () => {
  document.addEventListener('mousemove', drag)
})
document.addEventListener('mouseup',  e => {
  document.removeEventListener('mousemove', drag)
})

socket.on('moveCircle', (positions)=>{
  drawCircle(positions)
})