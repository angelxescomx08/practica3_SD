const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql2')
const http = require("http").Server(app);
const io = require("socket.io")(http);
const fetch = require('node-fetch');
const puerto = process.env.PORT || 9000
let i = 0

app.use(express.static(path.join(__dirname, 'public')))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'practica3'
})

const insertar_usuario = (connection, values) => {
    connection.query(
        `INSERT INTO Usuario (ip,nombre) VALUES ?`,
        [values],
        (err, rows, flieds) => {
            if (err) throw err
        });
}

const insertar_pedido = (connection, values) => {
    connection.query(
        `INSERT INTO Pedido (fecha,hora_inicio) VALUES ?`,
        [values],
        (err, rows, flieds) => {
            if (err) throw err
        });
}

const insertar_sesion = (connection, values) => {
    connection.query(
        `INSERT INTO Sesion (id_pedido,id_libro) VALUES ?`,
        [values],
        (err, rows, flieds) => {
            if (err) throw err
        });
}

const insertar_usuario_sesion = (connection, values) => {
    connection.query(
        `INSERT INTO UsuarioSesion (id_usuario,id_sesion) VALUES ?`,
        [values],
        (err, rows, flieds) => {
            if (err) throw err
        });
}

const consultar_libros = (connection, socket, j) => {
    connection.query(`select * from Libro`, (err, rows, fields) => {
        if (err) throw err
        if (i < rows.length) {
            io.emit('enviar_info', rows[j])
            i = j + 1
            if (i < rows.length) {
                io.emit('mandar_portada', rows[i].link)
            } else {
                io.emit('libros_agotados')
            }
        } else {
            io.emit('libros_agotados')
        }
    });
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'coordinador.html'))
})

app.get('/cliente1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'cliente1.html'))
})

io.on("connection", function (socket) {
    console.log("Se han conectado");
    socket.on('pedir', (datos) => {
        insertar_pedido(connection, [[datos.fecha, datos.hora]])
        fetch('http://localhost:9001/pedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    fecha: datos.fecha,
                    hora: datos.hora
                }
            })
        });
        consultar_libros(connection, socket, i)
        connection.query(`select id,ISBN from Pedido join Libro`, (err, rows, fields) => {
            if (err) throw err
            let datos = rows[rows.length - 1]
            insertar_sesion(connection, [[datos.id, datos.ISBN]])
            fetch('http://localhost:9001/sesion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: {
                        id: datos.id,
                        ISBN: datos.ISBN
                    }
                })
            });
            connection.query(`select id,id_sesion from Usuario join Sesion`, (err, rows, fields) => {
                if (err) throw err
                let datos = rows[rows.length - 1]
                insertar_usuario_sesion(connection, [[datos.id, datos.id_sesion]])
                fetch('http://localhost:9001/usuario_sesion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: {
                            id: datos.id,
                            id_sesion: datos.id_sesion
                        }
                    })
                });
            })
        })
    })
    socket.on('inicio', () => {
        connection.query(`select * from Libro`, (err, rows, fields) => {
            if (err) throw err
            if (i < rows.length) {
                io.emit('mandar_portada', rows[0].link)
            }
        });
    })
    socket.on('reiniciar', () => {
        i = 0

        connection.query(`select * from Libro`, (err, rows, fields) => {
            if (err) throw err
            if (i < rows.length) {
                io.emit('mandar_portada', rows[0].link)
            }

        })
    })
    socket.on('cliente1_conectado', () => {
        console.log(socket.handshake.address)
        insertar_usuario(connection, [[socket.handshake.address, 'cliente1']])
        fetch('http://localhost:9001/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    id: socket.handshake.address,
                    id_sesion: 'cliente1'
                }
            })
        });
    })
})

http.listen(puerto, () => {
    console.log(`Escuchando en el puerto ${puerto}`);
});