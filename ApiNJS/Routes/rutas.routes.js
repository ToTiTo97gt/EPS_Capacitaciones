const express = require("express");
const router = express.Router();
const usuario= require("../Controllers/tareas.controllers");

router.get("/Prueba",usuario.Prueba);
router.post("/RegistrarAdmin", usuario.RegistrarAdmin);
router.post("/GetEmpleados", usuario.Empleados);
router.post("/GetAdminUser",usuario.AdminUser);
router.post("/GetAdminPermisos", usuario.AdminPermisos);
router.post("/GetAdminLista", usuario.AdminLista);
router.post("/permisos", usuario.Permisos);
router.post("/permisosAdmin", usuario.PermisosAdmin);
router.post("/revocar", usuario.RevocarPermiso)
router.post("/AsignarPermiso", usuario.AsignarPermiso)
router.post("/EliminarAdmin", usuario.EliminarAdmin)
//Rutas para la pestaña crear
router.post('/JornadaNueva', usuario.JornadaNueva)
router.post('/Jornadas', usuario.GetJornadas)
router.post('/JornadasAnio', usuario.JornadasAnio)
router.post('/JornadaEspecifica', usuario.GetJornadaEspecifica)
router.post('/modificarJornada', usuario.modificarJornada)
router.post('/eliminarJornada', usuario.eliminarJornada)
router.post('/CrearCapacitacion', usuario.CrearCapacitacion)
router.post('/Agendar', usuario.Agendar)
router.post('/getAgenda', usuario.getAgenda)
router.post('/Capacitaciones', usuario.Capacitaciones)
router.post('/CapacitacionesXJornada', usuario.CapacitacionesPorJornada)
router.post('/CapacitacionReciente', usuario.CapacitacionReciente)
router.post('/Actualizar0', usuario.Actualizar0)
router.post('/Actualizar1', usuario.Actualizar1)
/* router.post("/login",usuario.login);
router.post("/registro",usuario.registro);
router.post("/getUser",usuario.getUsuario);
router.post("/Sugerencias",usuario.getSugerencias)
router.post("/Amigos",usuario.getAmigos)
router.post("/Solicitudes",usuario.getSolicitudes)
router.post("/adminFriends",usuario.manageFriends) */

//endpoints de diego
/* router.post("/verifica", usuario.verificando);
router.post("/subirFile", usuario.SubirFile);
router.post("/getFiles", usuario.getArchivos);
router.post("/getMisFiles", usuario.getMisArchivos);
router.post("/Eliminar", usuario.EliminarFile);
router.post("/editFile", usuario.EditFile); */

module.exports = router