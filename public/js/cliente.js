const pedir_libro = (socket) =>{
    const d = new Date()
    const fecha = d.getFullYear()+':'+d.getMonth()+':'+d.getDate()
    socket.emit('pedir',
        {'fecha':fecha,'hora':r1.formato_hora()})
}

socket.on('enviar_info',(libro)=>{
    const p = document.getElementById('informacion')
    p.innerHTML = `ISBN: ${libro.ISBN} <br/>
                    libro: ${libro.nombre} <br/>
                    autor: ${libro.autor} <br/>
                    editorial: ${libro.editorial} <br/>
                    precio: ${libro.precio}`
})
socket.on('libros_agotados',()=>{
    alert('Se han agotado los libros reinicie')
})
socket.emit('cliente1_conectado')