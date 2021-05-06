create database practica3;
use practica3;

create table Usuario(
    id int NOT NULL AUTO_INCREMENT primary key,
    ip varchar(20) NOT NULL,
    nombre varchar(50) NOT NULL
);

create table Pedido(
    id int NOT NULL AUTO_INCREMENT primary key,
    fecha date NOT NULL,
    hora_inicio time NOT NULL
);

create table Libro(
    ISBN varchar(13) NOT NULL primary key,
    nombre varchar(50) NOT NULL,
    autor varchar(50) NOT NULL,
    editorial varchar(50) NOT NULL,
    precio float NOT NULL,
    link varchar(50)
);

create table Sesion(
    id_sesion int NOT NULL AUTO_INCREMENT primary key,
    id_pedido int NOT NULL,
    id_libro varchar(13) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id) ON DELETE CASCADE,
    FOREIGN KEY (id_libro) references Libro(ISBN) ON DELETE CASCADE
);

create table UsuarioSesion(
    id_s int NOT NULL AUTO_INCREMENT primary key,
    id_usuario int NOT NULL ,
    id_sesion int NOT NULL,
    foreign key (id_usuario) references Usuario(id),
    foreign key (id_sesion) references Sesion(id_sesion)
);

INSERT INTO Libro values ('9780060098919','El gran Gatsby','F. Scott','Anagrama',123.53,'./img/el-gran-gatsby.jpg');
INSERT INTO Libro values ('9780064105489','El perfume','Patrick Suskind','Seix Barral',218.14,'./img/el-perfume.jpg');
INSERT INTO Libro values ('8721064105489','El senor de los anillos','J. R. R. Tolkien','Tirant Lo Blanch',762.09,'./img/el-senor-de-los-anillos.jpg');
INSERT INTO Libro values ('8721040602154','El resplandor','Stephen King','Alfaguara',167.70 ,'./img/el-resplandor.jpg');
INSERT INTO Libro values ('0457890602154','Matar a un ruisenor','Harper Lee','J. B. Lippincott',214.70,'./img/matar-a-un-ruisenor.jpg' );

ALTER TABLE Sesion CHANGE `id_sesion` `id_s` int NOT NULL AUTO_INCREMENT;

ALTER TABLE Libro ADD link varchar(50);

ALTER TABLE Pedido DROP COLUMN hora_fin;
ALTER TABLE UsuarioSesion DROP COLUMN tiempo_usuario;

ALTER TABLE Usuario
MODIFY COLUMN ip varchar(20); 

DROP DATABASE practica3;

UPDATE Libro
  SET link='./img/matar-a-un-ruisenor.jpg'
  WHERE ISBN='0457890602154';


select id,ISBN from Pedido join Libro;