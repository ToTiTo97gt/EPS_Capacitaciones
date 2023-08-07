create database eps;
use eps;

create table jornada(
	idJornada int auto_increment primary key,
    ciclo varchar(40),
    descripcion varchar(150),
    fechaInicio date,
    fechaFinal date
);

create table departamento(
	idDepartamento int auto_increment primary key,
    departamento varchar(20)
);

create table municipio(
	idMunicipio int auto_increment primary key,
    municipio varchar(25),
    idDepartamento int,
    foreign key (idDepartamento) references departamento(idDepartamento)
);

create table usuario(
	idUsuario int primary key auto_increment,
	carne varchar(10) not null,
    cui varchar(16) not null,
    nombre varchar(50),
    apellido varchar(50),
    correo varchar(45),
    passwo varchar(30),
    genero int,
    direccon varchar(100),
	idmunicipio int not null,
    foreign key (idmunicipio) references municipio(idMunicipio)
);

create table categoria(
	idCategoria int auto_increment primary key,
    categoria varchar(16)
);

create table capacitacion(
	idCapacitacion int auto_increment primary key,
    nomCapacitacion varchar(60),
    descripcion varchar(200),
    presentador varchar(50),
    poster varchar(250),
    zoomLink varchar(275),
    fbLink varchar(275),
    idJornada int,
    idCategoria int,
    foreign key (idJornada) references jornada(idJornada),
    foreign key (idCategoria) references categoria(idCategoria)
);

create table agenda(
	idAgenda int auto_increment primary key,
    fecha date,
    hora time,
    idCapacitacion int,
    foreign key (idCapacitacion) references capacitacion(idCapacitacion)
);

create table asistencia(
	usuario_id int,
    incrito boolean,
    presente boolean,
    idAgenda int,
    foreign key (idAgenda) references agenda(idAgenda),
    foreign key (usuario_id) references usuario(idUsuario)
);

create table nota(
	usuario_id int,
    idCapacitacion int,
    nota int,
    foreign key (usuario_id) references usuario(idUsuario),
    foreign key (idCapacitacion) references capacitacion(idCapacitacion)
);

create table administrador(
	idAdmin int auto_increment primary key,
    nombre varchar(45) not null,
    apellido varchar(45) not null,
    email varchar(30) not null,
    telefono varchar(10) not null
);

create table permiso(
	idPermiso int auto_increment primary key,
    permiso varchar(35)
);

create table adminpermiso(
	idAdmin int,
    idPermiso int,
    foreign key (idAdmin) references administrador(idAdmin),
    foreign key (idPermiso) references permiso(idPermiso)
);



