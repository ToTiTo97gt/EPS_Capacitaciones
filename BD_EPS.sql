CREATE DATABASE  IF NOT EXISTS `eps` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `eps`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: eps
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `idAdmin` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `email` varchar(30) NOT NULL,
  `passw` varchar(25) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idAdmin`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (2,'Dani','Martinez','DanMart88@gmail.com','Contra33','35199973',1),(6,'Marcos','Perez','prueba@gmail.com','contra7','12354684',1),(11,'Danilo','Perez','DaniPer@ejemplo.com','Contra3','55556666',1),(15,'Diego','Vasquez','totodiego1897@gmail.com','Contra00','35199973',1);
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adminpermiso`
--

DROP TABLE IF EXISTS `adminpermiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminpermiso` (
  `idAdmin` int DEFAULT NULL,
  `idPermiso` int DEFAULT NULL,
  UNIQUE KEY `unique_adminpermiso1` (`idAdmin`,`idPermiso`),
  KEY `idPermiso` (`idPermiso`),
  CONSTRAINT `adminpermiso_ibfk_1` FOREIGN KEY (`idAdmin`) REFERENCES `administrador` (`idAdmin`) ON DELETE CASCADE,
  CONSTRAINT `adminpermiso_ibfk_2` FOREIGN KEY (`idPermiso`) REFERENCES `permiso` (`idPermiso`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminpermiso`
--

LOCK TABLES `adminpermiso` WRITE;
/*!40000 ALTER TABLE `adminpermiso` DISABLE KEYS */;
INSERT INTO `adminpermiso` VALUES (2,1),(6,2),(6,4);
/*!40000 ALTER TABLE `adminpermiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agenda`
--

DROP TABLE IF EXISTS `agenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agenda` (
  `idAgenda` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `idCapacitacion` int DEFAULT NULL,
  PRIMARY KEY (`idAgenda`),
  KEY `idCapacitacion` (`idCapacitacion`),
  CONSTRAINT `agenda_ibfk_1` FOREIGN KEY (`idCapacitacion`) REFERENCES `capacitacion` (`idCapacitacion`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda`
--

LOCK TABLES `agenda` WRITE;
/*!40000 ALTER TABLE `agenda` DISABLE KEYS */;
INSERT INTO `agenda` VALUES (1,'2023-10-02','13:40:00',1),(2,'2023-10-07','15:00:00',2),(3,'2023-03-02','16:08:00',3),(12,'2023-04-11','12:00:00',9),(13,'2023-10-10','12:30:00',10),(14,'2023-10-10','13:30:00',11),(15,'2023-10-10','18:00:00',12),(16,'2023-10-13','18:00:00',12),(17,'2023-10-17','18:00:00',12),(18,'2023-10-20','18:00:00',12),(19,'2023-03-13','13:00:00',13),(20,'2023-10-12','15:00:00',14),(28,'2023-10-09','08:50:00',4),(29,'2023-10-10','08:50:00',4),(30,'2023-10-11','08:50:00',4),(31,'2023-10-12','08:50:00',4),(32,'2023-11-09','20:00:00',15),(33,'2023-11-13','16:14:00',16),(34,'2023-12-07','13:30:00',17),(35,'2023-12-12','13:00:00',18),(50,'2024-01-01','15:00:00',27),(51,'2024-01-02','15:00:00',27),(52,'2024-01-03','15:00:00',27),(53,'2024-01-04','15:00:00',27),(54,'2023-12-25','12:00:00',28),(55,'2023-12-26','12:00:00',28),(56,'2023-12-27','12:00:00',28),(57,'2023-12-28','12:00:00',28),(58,'2023-12-27','13:00:00',29),(59,'2024-01-10','12:00:00',30);
/*!40000 ALTER TABLE `agenda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asistencia`
--

DROP TABLE IF EXISTS `asistencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asistencia` (
  `idUsuario` int DEFAULT NULL,
  `inscrito` tinyint(1) DEFAULT NULL,
  `presente` tinyint(1) DEFAULT NULL,
  `idCapacitacion` int DEFAULT NULL,
  UNIQUE KEY `unique_user_capacitacion` (`idUsuario`,`idCapacitacion`),
  KEY `idCapacitacion` (`idCapacitacion`),
  CONSTRAINT `asistencia_ibfk_1` FOREIGN KEY (`idCapacitacion`) REFERENCES `capacitacion` (`idCapacitacion`),
  CONSTRAINT `asistencia_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asistencia`
--

LOCK TABLES `asistencia` WRITE;
/*!40000 ALTER TABLE `asistencia` DISABLE KEYS */;
INSERT INTO `asistencia` VALUES (1,1,1,1),(1,1,1,2),(1,1,1,10),(1,0,0,11),(1,0,0,14),(2,1,0,1),(2,0,0,2),(2,1,1,4),(2,1,1,10),(2,0,0,11),(2,1,1,12),(2,0,0,14),(1,0,0,15),(1,0,0,16),(3,1,1,1),(3,1,1,2),(3,0,0,4),(3,0,0,10),(3,1,0,11),(3,0,0,12),(3,0,0,14),(3,0,0,15),(3,0,0,16),(2,0,0,15),(2,0,0,16),(1,0,0,4),(1,0,0,12),(4,0,0,1),(4,0,0,2),(4,0,0,4),(4,1,1,10),(4,0,0,11),(4,0,0,12),(4,0,0,14),(4,0,0,15),(4,0,0,16),(5,1,1,1),(5,0,0,2),(5,0,0,4),(5,0,0,10),(5,0,0,11),(5,0,0,12),(5,0,0,14),(5,0,0,15),(5,0,0,16),(7,0,0,1),(7,0,0,2),(7,0,0,4),(7,0,0,10),(7,0,0,11),(7,0,0,12),(7,0,0,14),(7,0,0,15),(7,0,0,16),(4,0,0,17),(1,0,0,17),(3,0,0,17),(2,0,0,17),(5,0,0,17),(7,0,0,17),(4,0,0,18),(1,0,0,18),(3,0,0,18),(2,0,0,18),(5,0,0,18),(7,0,0,18),(4,0,0,27),(1,0,0,27),(3,0,0,27),(2,0,0,27),(5,0,0,27),(7,0,0,27),(4,0,0,28),(1,0,0,28),(3,1,1,28),(2,0,0,28),(5,0,0,28),(7,0,0,28),(4,0,0,29),(1,0,0,29),(3,0,0,29),(2,0,0,29),(5,0,0,29),(7,0,0,29),(4,0,0,30),(1,1,0,30),(5,0,0,30),(3,0,0,30),(2,1,0,30),(7,0,0,30);
/*!40000 ALTER TABLE `asistencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ayuda`
--

DROP TABLE IF EXISTS `ayuda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ayuda` (
  `idUsuario` int DEFAULT NULL,
  `Asunto` varchar(200) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `estado` int DEFAULT NULL,
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `ayuda_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ayuda`
--

LOCK TABLES `ayuda` WRITE;
/*!40000 ALTER TABLE `ayuda` DISABLE KEYS */;
INSERT INTO `ayuda` VALUES (2,'tengo un problema','mi problema es tal cosa',0),(1,'Problema 2','Otro ejemplo',1),(3,'problema 3','Estoy haciendo pruebas',0);
/*!40000 ALTER TABLE `ayuda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `capacitacion`
--

DROP TABLE IF EXISTS `capacitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `capacitacion` (
  `idCapacitacion` int NOT NULL AUTO_INCREMENT,
  `nomCapacitacion` varchar(160) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `presentador` varchar(50) DEFAULT NULL,
  `poster` varchar(250) DEFAULT NULL,
  `zoomLink` varchar(275) DEFAULT NULL,
  `fbLink` varchar(275) DEFAULT NULL,
  `idJornada` int DEFAULT NULL,
  `idCategoria` int DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `diploma` varchar(150) DEFAULT NULL,
  `duracion` varchar(30) DEFAULT NULL,
  `modalidad` int DEFAULT NULL,
  PRIMARY KEY (`idCapacitacion`),
  KEY `idJornada` (`idJornada`),
  KEY `idCategoria` (`idCategoria`),
  CONSTRAINT `capacitacion_ibfk_1` FOREIGN KEY (`idJornada`) REFERENCES `jornada` (`idJornada`),
  CONSTRAINT `capacitacion_ibfk_2` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `capacitacion`
--

LOCK TABLES `capacitacion` WRITE;
/*!40000 ALTER TABLE `capacitacion` DISABLE KEYS */;
INSERT INTO `capacitacion` VALUES (1,'Prueba final de post cambio','Prueba final de post cambio','lic. prueba cambio','https://bucket-jornadas.s3.amazonaws.com/Posts/Conferencia1.jpg','ZOOM','FACEBOOK',1,1,1,'','cuatro',1),(2,'Conferencia 2','Otro ejemplo','Daniel Martinez','https://bucket-jornadas.s3.amazonaws.com/Posts/Conferencia2.jpg','LinkZoom','LinkFaceBook',1,1,1,NULL,'tres',1),(3,'Conferencia Jornada 1','Esto no es mas que un ejemplo','David Martinez','','LinkZoom','LinkFaceBook',2,1,1,NULL,'tres',1),(4,'Este es un modificado','descripcion de modificada','','https://bucket-jornadas.s3.amazonaws.com/Posts/Diplomado1.jpg','LinkModificado','FaceBookModificado',1,2,1,'https://bucket-jornadas.s3.amazonaws.com/Plantillas/Plantilla_Este%20es%20un%20modificado.jpg','cuarenta y cinco',1),(9,'cambio de jornada','cambiado jornada','Poster cambiado','https://bucket-jornadas.s3.amazonaws.com/Posts/UsuarioP02.JPG','Poster cambiado','cambio de poster',2,1,1,NULL,'tres',1),(10,'prueba 2','prueba 2','prueba 2','https://bucket-jornadas.s3.amazonaws.com/Posts/Inicio.JPG','prueba 2','prueba 2',1,1,1,NULL,'tres',1),(11,'png','png','png','https://bucket-jornadas.s3.amazonaws.com/Posts/prueba.jpg','png','png',1,1,1,NULL,'tres',1),(12,'Diplomado ejemplo','descripcion','','https://bucket-jornadas.s3.amazonaws.com/Posts/Diplomado2.jpg','link zoom','',1,2,1,'https://bucket-jornadas.s3.amazonaws.com/Plantillas/Plantilla_Diplomado+ejemplo.jpg','cuarenta y cuatro',1),(13,'ejemplo','ejemplo','presendador ejemplo','https://bucket-jornadas.s3.amazonaws.com/Posts/Telefono.JPG','link de zoom ejemplo','facebook ejemplo',2,1,1,NULL,'tres',1),(14,'Ejemplo 9octubre','Descripcion de capacitacion','Ing. Juan','https://bucket-jornadas.s3.amazonaws.com/Posts/Conferencia1.jpg','linkZOOM','LINK FACEBOOK',1,1,1,NULL,'tres',1),(15,'Otra conferencia','Esto es un ejemplo creado el 8 del 11','Ejemplo','https://bucket-jornadas.s3.amazonaws.com/Posts/UsuarioP05.JPG','LinkFB','LINKZOOM',1,1,1,NULL,'tres',1),(16,'otra conferencia solo por que si','Se me dio la gana','hola a todos','https://bucket-jornadas.s3.amazonaws.com/Posts/Admin07.JPG','Link tweeter','Link YOUTUBE',1,1,1,NULL,'tres',1),(17,'Nueva Capacitacion','Esto es nuevo','Soy nuevo','https://bucket-jornadas.s3.amazonaws.com/Posts/GroomingSpa.jpg','Soy nuevo Link','Soy Nuevo Link',1,1,1,NULL,'tres',1),(18,'conferencia 12/12','confe 12/12','Don Nade','https://bucket-jornadas.s3.amazonaws.com/Posts/gato.jpg','Zoomin','FaceBookear',1,1,1,NULL,'tres',1),(27,'Otro Diplomado','Otro ejemplo','','https://bucket-jornadas.s3.amazonaws.com/Posts/Arquitectura.jpg','https://www.youtube.com/watch?v=oYgqEkwJJDE&list=RDMMoYgqEkwJJDE&start_radio=1','https://www.youtube.com/watch?v=oYgqEkwJJDE&list=RDMMoYgqEkwJJDE&start_radio=1',4,2,1,'null','cuarenta y cuatro',1),(28,'Otra Prueba','Probando de nuevo','','https://bucket-jornadas.s3.amazonaws.com/Posts/Reunion.JPG','vebrtbrtrttrgwv','gberrgryhtbyhybtb',1,2,1,'https://bucket-jornadas.s3.amazonaws.com/Plantillas/Plantilla_Otra+Prueba.jpg','cuarenta y cuatro',1),(29,'Otra prueba 26/12','estoy probando','navidad','https://bucket-jornadas.s3.amazonaws.com/Posts/Conferencia1.jpg','lcniecina','cniwcuriunu',1,1,1,NULL,'dos',1),(30,'Conferencia 8/01','primera del 2024','Don Nadi','https://bucket-jornadas.s3.amazonaws.com/Posts/Conferencia1.jpg','https://www.youtube.com/watch?v=5BfssJC6hxc&list=RDMMoYgqEkwJJDE&index=2','https://www.youtube.com/watch?v=i09T6Nl9uDo&list=RDMMoYgqEkwJJDE&index=10',4,1,1,'','tres',1);
/*!40000 ALTER TABLE `capacitacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `idCategoria` int NOT NULL AUTO_INCREMENT,
  `categoria` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'capacitacion'),(2,'diplomado');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamento`
--

DROP TABLE IF EXISTS `departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamento` (
  `idDepartamento` int NOT NULL AUTO_INCREMENT,
  `departamento` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idDepartamento`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES (1,'Alta Verapaz'),(2,'Baja Verapaz'),(3,'Chimaltenango'),(4,'Chiquimula'),(5,'El Progreso'),(6,'Escuintla'),(7,'Guatemala'),(8,'Huehuetenango'),(9,'Izabal'),(10,'Jalapa'),(11,'Jutiapa'),(12,'Peten'),(13,'Quetzaltenango'),(14,'Quiche'),(15,'Retalhuleu'),(16,'Sacatepequez'),(17,'San Marcos'),(18,'Santa Rosa'),(19,'Solola'),(20,'Suchitepequez'),(21,'Totonicapan'),(22,'Zacapa');
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jornada`
--

DROP TABLE IF EXISTS `jornada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jornada` (
  `idJornada` int NOT NULL AUTO_INCREMENT,
  `ciclo` varchar(40) DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaFinal` date DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idJornada`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jornada`
--

LOCK TABLES `jornada` WRITE;
/*!40000 ALTER TABLE `jornada` DISABLE KEYS */;
INSERT INTO `jornada` VALUES (1,'Segunda Jornada 2023','2023-09-25','2023-12-31',0),(2,'Primer Semestre 2023','2023-02-10','2023-05-20',0),(3,'jornada 2022','2022-02-01','2022-05-10',0),(4,'Jornada ejemplo Ene','2024-01-01','2024-01-31',1);
/*!40000 ALTER TABLE `jornada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `municipio`
--

DROP TABLE IF EXISTS `municipio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `municipio` (
  `idMunicipio` int NOT NULL AUTO_INCREMENT,
  `municipio` varchar(45) DEFAULT NULL,
  `idDepartamento` int DEFAULT NULL,
  PRIMARY KEY (`idMunicipio`),
  KEY `idDepartamento` (`idDepartamento`),
  CONSTRAINT `municipio_ibfk_1` FOREIGN KEY (`idDepartamento`) REFERENCES `departamento` (`idDepartamento`)
) ENGINE=InnoDB AUTO_INCREMENT=341 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `municipio`
--

LOCK TABLES `municipio` WRITE;
/*!40000 ALTER TABLE `municipio` DISABLE KEYS */;
INSERT INTO `municipio` VALUES (1,'Chahal',1),(2,'Chisec',1),(3,'Coban',1),(4,'Fray Bartolome de las Casas',1),(5,'La Tinta',1),(6,'Lanquin',1),(7,'Panzos',1),(8,'Raxruha',1),(9,'San Cristobal Verapaz',1),(10,'San Juan Chamelco',1),(11,'San Pedro Carcha',1),(12,'Santa Cruz Verapaz',1),(13,'Cahabon',1),(14,'Senahu',1),(15,'Tamahu',1),(16,'Tactic',1),(17,'Tucuru',1),(18,'Cubulco',2),(19,'Granados',2),(20,'Purulha',2),(21,'Rabinal',2),(22,'Salama',2),(23,'San Jeronimo',2),(24,'San Miguel Chicaj',2),(25,'Santa Cruz el Chol',2),(26,'Acatenango',3),(27,'Chimaltenango',3),(28,'El Tejar',3),(29,'Parramos',3),(30,'Patzicia',3),(31,'Patzun',3),(32,'Pochuta',3),(33,'San Andres Itzapa',3),(34,'San Jose Poaquil',3),(35,'San Juan Comalapa',3),(36,'San Martin Jilotepeque',3),(37,'Santa Apolonia',3),(38,'Santa Cruz Balanya',3),(39,'Tecpan',3),(40,'Yepocapa',3),(41,'Zaragoza',3),(42,'Camotan',4),(43,'Chiquimula',4),(44,'Concepcion Las Minas',4),(45,'Esquipulas',4),(46,'Ipala',4),(47,'Jocotan',4),(48,'Olopa',4),(49,'Quetzaltepeque',4),(50,'San Jacinto',4),(51,'San José la Arada',4),(52,'San Juan Ermita',4),(53,'El Jicaro',5),(54,'Guastatoya',5),(55,'Morazan',5),(56,'San Agustín Acasaguastlan',5),(57,'San Antonio La Paz',5),(58,'San Cristóbal Acasaguastlan',5),(59,'Sanarate',5),(60,'Sansare',5),(61,'Escuintla',6),(62,'Guanagazapa',6),(63,'Iztapa',6),(64,'La Democracia',6),(65,'La Gomera',6),(66,'Masagua',6),(67,'Nueva Concepcion',6),(68,'Palin',6),(69,'San Jose',6),(70,'San Vicente Pacaya',6),(71,'Santa Lucia Cotzumalguapa',6),(72,'Sipacate',6),(73,'Siquinala',6),(74,'Tiquisate',6),(75,'Amatitlan',7),(76,'Chinautla',7),(77,'Chuarrancho',7),(78,'Ciudad de Guatemala',7),(79,'Fraijanes',7),(80,'Mixco',7),(81,'Palencia',7),(82,'San Jose del Golfo',7),(83,'San Jose Pinula',7),(84,'San Juan Sacatepequez',7),(85,'San Miguel Petapa',7),(86,'San Pedro Ayampuc',7),(87,'San Pedro Sacatepequez',7),(88,'San Raymundo',7),(89,'Santa Catarina Pinula',7),(90,'Villa Canales',7),(91,'Villa Nueva',7),(92,'Aguacatan',8),(93,'Chiantla',8),(94,'Colotenango',8),(95,'Concepcion Huista',8),(96,'Cuilco',8),(97,'Huehuetenango',8),(98,'Jacaltenango',8),(99,'La Democracia',8),(100,'La Libertad',8),(101,'Malacatancito',8),(102,'Nenton',8),(103,'Petatan',8),(104,'San Antonio Huista',8),(105,'San Gaspar Ixchil',8),(106,'San Ildefonso Ixtahuacan',8),(107,'San Juan Atitan',8),(108,'San Juan Ixcoy',8),(109,'San Mateo Ixtatan',8),(110,'San Miguel Acatan',8),(111,'San Pedro Necta',8),(112,'San Pedro Soloma',8),(113,'San Rafael La Independencia',8),(114,'San Rafael Petzal',8),(115,'San Sebastian Coatan',8),(116,'San Sebastian Huehuetenango',8),(117,'Santa Ana Huista',8),(118,'Santa Barbara',8),(119,'Santa Cruz Barillas',8),(120,'Santa Eulalia',8),(121,'Santiago Chimaltenango',8),(122,'Tectitan',8),(123,'Todos Santos Cuchumatan',8),(124,'Union Cantinil',8),(125,'El Estor',9),(126,'Livingston',9),(127,'Los Amates',9),(128,'Morales',9),(129,'Puerto Barrios',9),(130,'Jalapa',10),(131,'Mataquescuintla',10),(132,'Monjas',10),(133,'San Carlos Alzatate',10),(134,'San Luis Jilotepeque',10),(135,'San Manuel Chaparron',10),(136,'San Pedro Pinula',10),(137,'Agua Blanca',11),(138,'Asuncion Mita',11),(139,'Atescatempa',11),(140,'Comapa',11),(141,'Conguaco',11),(142,'El Adelanto',11),(143,'El Progreso',11),(144,'Jalpatagua',11),(145,'Jerez',11),(146,'Jutiapa',11),(147,'Moyuta',11),(148,'Pasaco',11),(149,'Quesada',11),(150,'San Jose Acatempa',11),(151,'Santa Catarina Mita',11),(152,'Yupiltepeque',11),(153,'Zapotitlan',11),(154,'Dolores',12),(155,'El Chal',12),(156,'Isla de Flores, Santa Elena de la Cruz',12),(157,'La Libertad',12),(158,'Las Cruces',12),(159,'Melchor de Mencos',12),(160,'Poptun',12),(161,'San Andres',12),(162,'San Benito',12),(163,'San Francisco',12),(164,'San Jose',12),(165,'San Luis',12),(166,'Santa Ana',12),(167,'Sayaxche',12),(168,'Almolonga',13),(169,'Cabrican',13),(170,'Cajola',13),(171,'Cantel',13),(172,'Coatepeque',13),(173,'Colomba Costa Cuca',13),(174,'Concepcion Chiquirichapa',13),(175,'El Palmar',13),(176,'Flores Costa Cuca',13),(177,'Genova',13),(178,'Huitan',13),(179,'La Esperanza',13),(180,'Olintepeque',13),(181,'Palestina de Los Altos',13),(182,'Quetzaltenango',13),(183,'Salcaja',13),(184,'San Carlos Sija',13),(185,'San Francisco La Union',13),(186,'San Juan Ostuncalco',13),(187,'San Martin Sacatepequez',13),(188,'San Mateo',13),(189,'San Miguel Siguila',13),(190,'Sibilia',13),(191,'Zunil',13),(192,'Canilla',14),(193,'Chajul',14),(194,'Chicaman',14),(195,'Chiche',14),(196,'Santo Tomas Chichicastenango',14),(197,'Chinique',14),(198,'Cunen',14),(199,'Ixcan',14),(200,'Joyabaj',14),(201,'Nebaj',14),(202,'Pachalum',14),(203,'Patzite',14),(204,'Sacapulas',14),(205,'San Andres Sajcabaja',14),(206,'San Antonio Ilotenango',14),(207,'San Bartolome Jocotenango',14),(208,'San Juan Cotzal',14),(209,'San Pedro Jocopilas',14),(210,'Santa Cruz del Quiche',14),(211,'Uspantan',14),(212,'Zacualpa',14),(213,'Champerico',15),(214,'El Asintal',15),(215,'Nuevo San Carlos',15),(216,'Retalhuleu',15),(217,'San Andres Villa Seca',15),(218,'San Felipe',15),(219,'San Martin Zapotitlan',15),(220,'San Sebastian',15),(221,'Santa Cruz Mulua',15),(222,'Alotenango',16),(223,'Ciudad Vieja',16),(224,'Jocotenango',16),(225,'Antigua Guatemala',16),(226,'Magdalena Milpas Altas',16),(227,'Pastores',16),(228,'San Antonio Aguas Calientes',16),(229,'San Bartolome Milpas Altas',16),(230,'San Lucas Sacatepequez',16),(231,'San Miguel Dueñas',16),(232,'Santa Catarina Barahona',16),(233,'Santa Lucia Milpas Altas',16),(234,'Santa Maria de Jesus',16),(235,'Santiago Sacatepequez',16),(236,'Santo Domingo Xenacoj',16),(237,'Sumpango',16),(238,'Ayutla',17),(239,'Catarina',17),(240,'Comitancillo',17),(241,'Concepcion Tutuapa',17),(242,'El Quetzal',17),(243,'El Tumbador',17),(244,'Esquipulas Palo Gordo',17),(245,'Ixchiguan',17),(246,'La Blanca',17),(247,'La Reforma',17),(248,'Malacatan',17),(249,'Nuevo Progreso',17),(250,'Ocos',17),(251,'Pajapita',17),(252,'Rio Blanco',17),(253,'San Antonio Sacatepequez',17),(254,'San Cristobal Cucho',17),(255,'San Jose El Rodeo',17),(256,'San Jose Ojetenam',17),(257,'San Lorenzo',17),(258,'San Marcos',17),(259,'San Miguel Ixtahuacan',17),(260,'San Pablo',17),(261,'San Pedro Sacatepequez',17),(262,'San Rafael Pie de la Cuesta',17),(263,'Sibinal',17),(264,'Sipacapa',17),(265,'Tacana',17),(266,'Tajumulco',17),(267,'Tejutla',17),(268,'Barberena',18),(269,'Casillas',18),(270,'Chiquimulilla',18),(271,'Cuilapa',18),(272,'Guazacapan',18),(273,'Nueva Santa Rosa',18),(274,'Oratorio',18),(275,'Pueblo Nuevo Viñas',18),(276,'San Juan Tecuaco',18),(277,'San Rafael las Flores',18),(278,'Santa Cruz Naranjo',18),(279,'Santa Maria Ixhuatan',18),(280,'Santa Rosa de Lima',18),(281,'Taxisco',18),(282,'Concepcion',19),(283,'Nahuala',19),(284,'Panajachel',19),(285,'San Andres Semetabaj',19),(286,'San Antonio Palopo',19),(287,'San Jose Chacaya',19),(288,'San Juan La Laguna',19),(289,'San Lucas Toliman',19),(290,'San Marcos La Laguna',19),(291,'San Pablo La Laguna',19),(292,'San Pedro La Laguna',19),(293,'Santa Catarina Ixtahuacan',19),(294,'Santa Catarina Palopo',19),(295,'Santa Clara La Laguna',19),(296,'Santa Cruz La Laguna',19),(297,'Santa Lucia Utatlan',19),(298,'Santa Maria Visitacion',19),(299,'Santiago Atitlan',19),(300,'Solola',19),(301,'Chicacao',20),(302,'Cuyotenango',20),(303,'Mazatenango',20),(304,'Patulul',20),(305,'Pueblo Nuevo',20),(306,'Rio Bravo',20),(307,'Samayac',20),(308,'San Antonio Suchitepequez',20),(309,'San Bernardino',20),(310,'San Francisco Zapotitlan',20),(311,'San Gabriel',20),(312,'San Jose El Idolo',20),(313,'San Jose La Maquina',20),(314,'San Juan Bautista',20),(315,'San Lorenzo',20),(316,'San Miguel Panan',20),(317,'San Pablo Jocopilas',20),(318,'Santa Barbara',20),(319,'Santo Domingo Suchitepequez',20),(320,'Santo Tomás La Union',20),(321,'Zunilito',20),(322,'Momostenango',21),(323,'San Andres Xecul',21),(324,'San Bartolo',21),(325,'San Cristobal Totonicapan',21),(326,'San Francisco El Alto',21),(327,'Santa Lucia La Reforma',21),(328,'Santa Maria Chiquimula',21),(329,'Totonicapan',21),(330,'Cabañas',22),(331,'Estanzuela',22),(332,'Gualan',22),(333,'Huite',22),(334,'La Union',22),(335,'Rio Hondo',22),(336,'San Diego',22),(337,'San Jorge',22),(338,'Teculutan',22),(339,'Usumatlan',22),(340,'Zacapa',22);
/*!40000 ALTER TABLE `municipio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nota`
--

DROP TABLE IF EXISTS `nota`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nota` (
  `idUsuario` int DEFAULT NULL,
  `idCapacitacion` int DEFAULT NULL,
  `nota` int DEFAULT NULL,
  UNIQUE KEY `unique_user_nota` (`idUsuario`,`idCapacitacion`),
  KEY `idCapacitacion` (`idCapacitacion`),
  CONSTRAINT `nota_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `nota_ibfk_2` FOREIGN KEY (`idCapacitacion`) REFERENCES `capacitacion` (`idCapacitacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nota`
--

LOCK TABLES `nota` WRITE;
/*!40000 ALTER TABLE `nota` DISABLE KEYS */;
INSERT INTO `nota` VALUES (2,12,69),(2,4,80),(3,28,80);
/*!40000 ALTER TABLE `nota` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permiso`
--

DROP TABLE IF EXISTS `permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permiso` (
  `idPermiso` int NOT NULL AUTO_INCREMENT,
  `permiso` varchar(35) DEFAULT NULL,
  PRIMARY KEY (`idPermiso`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
INSERT INTO `permiso` VALUES (1,'Principal'),(2,'Creacion'),(3,'Informacion'),(4,'Inscripciones'),(5,'Conferencias'),(6,'Diplomados'),(7,'Ayuda');
/*!40000 ALTER TABLE `permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipousuario`
--

DROP TABLE IF EXISTS `tipousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipousuario` (
  `idTipo` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idTipo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipousuario`
--

LOCK TABLES `tipousuario` WRITE;
/*!40000 ALTER TABLE `tipousuario` DISABLE KEYS */;
INSERT INTO `tipousuario` VALUES (1,'Docente Titular'),(2,'Docente Interino'),(3,'Docente de Postgrado'),(4,'Estudiante'),(5,'Profesional'),(6,'Profesionales de derecho y ciencias afines'),(7,'Otro');
/*!40000 ALTER TABLE `tipousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipousuariodiploma`
--

DROP TABLE IF EXISTS `tipousuariodiploma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipousuariodiploma` (
  `idCapacitacion` int DEFAULT NULL,
  `idTipo` int DEFAULT NULL,
  KEY `idCapacitacion` (`idCapacitacion`),
  KEY `idTipo` (`idTipo`),
  CONSTRAINT `tipousuariodiploma_ibfk_1` FOREIGN KEY (`idCapacitacion`) REFERENCES `capacitacion` (`idCapacitacion`),
  CONSTRAINT `tipousuariodiploma_ibfk_2` FOREIGN KEY (`idTipo`) REFERENCES `tipousuario` (`idTipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipousuariodiploma`
--

LOCK TABLES `tipousuariodiploma` WRITE;
/*!40000 ALTER TABLE `tipousuariodiploma` DISABLE KEYS */;
INSERT INTO `tipousuariodiploma` VALUES (27,2),(27,6),(4,1),(12,1),(12,5),(12,6),(28,1),(28,5),(28,6);
/*!40000 ALTER TABLE `tipousuariodiploma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `carne` varchar(10) DEFAULT NULL,
  `cui` varchar(16) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `passwo` varchar(30) DEFAULT NULL,
  `genero` int DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `idmunicipio` int NOT NULL,
  `idTipo` int DEFAULT NULL,
  `estado` int DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  KEY `idmunicipio` (`idmunicipio`),
  KEY `idTipo` (`idTipo`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idmunicipio`) REFERENCES `municipio` (`idMunicipio`),
  CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`idTipo`) REFERENCES `tipousuario` (`idTipo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'','2992658970101','Diego','Vasquez','totodiego1897@gmail.com','toto123',1,'zona 4',80,6,1),(2,'201602421','123456789','Daniel','Velasquez','prueba@gmail.com','dani1234',1,'zona 1',91,1,1),(3,'','987654321','Nelson','Luc','NelsonLuc@gmail.com','nelson123',1,'mi casa',90,1,1),(4,'201603212','112233665544','Daniela','Perez','PerDani97@gmail.com','DaniPer3',2,'en mi casa',3,4,1),(5,'201702458','0077553611','Rosario','Vasquez','rosario.gtVasquez@gmail.com','MariRosi97',2,'en mi casita',80,5,1),(7,'201701144','777444555666333','Probando','de Prueba','OtraPrueba@gmail.com','Probando1',1,'test',324,4,1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'eps'
--

--
-- Dumping routines for database 'eps'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-10 21:31:33
