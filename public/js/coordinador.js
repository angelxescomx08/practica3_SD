const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const portada = (imagen) => {
    let img = new Image()
    img.src = imagen

    img.onload = () => {
        ctx.drawImage(img, 0, 0, img.width, img.height,     // source rectangle
            0, 0, canvas.width, canvas.height);
    }
}
const reiniciar = (socket)=>{
    socket.emit('reiniciar')
}
socket.emit('inicio')
socket.on('mandar_portada', (link) => {
    portada(link)
})
socket.on('libros_agotados',()=>{
    alert('Se han agotado los libros reinicie')
})
