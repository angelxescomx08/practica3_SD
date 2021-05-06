const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql2')
const puerto = process.env.PORT || 9001
let i = 0

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'practica3_respaldo'
})

app.use(express.urlencoded());
app.use(express.json());

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

app.post('/pedido',(req,res)=>{
    console.log(req.body.data)
    insertar_pedido(connection,[[req.body.data.fecha,req.body.data.hora]])
})

app.post('/sesion',(req,res)=>{
    console.log(req.body.data)
    insertar_sesion(connection, [[req.body.data.id, req.body.data.ISBN]])
})

app.post('/usuario_sesion',(req,res)=>{
    console.log(req.body.data)
    insertar_usuario_sesion(connection, [[req.body.data.id, req.body.data.id_sesion]])
})

app.post('/usuario',(req,res)=>{
    console.log(req.body.data)
    insertar_usuario(connection, [[req.body.data.id, req.body.data.id_sesion]])
})

app.listen(puerto, () => {
    console.log(`Escuchando en el puerto ${puerto}`);
});