const express = require("express");
const router = express.Router();
const admin= require("../Controllers/tareas.controllers");

router.get("/Prueba",admin.Prueba);
router.post("/RegistrarAdmin", admin.RegistrarAdmin);
router.post("/GetEmpleados", admin.Empleados);
router.post("/GetAdminUser",admin.AdminUser);
router.post("/GetAdminPermisos", admin.AdminPermisos);
router.post("/GetAdminLista", admin.AdminLista);
router.post("/permisos", admin.Permisos);
router.post("/permisosAdmin", admin.PermisosAdmin);
router.post("/revocar", admin.RevocarPermiso)
router.post("/AsignarPermiso", admin.AsignarPermiso)
router.post("/EliminarAdmin", admin.EliminarAdmin)
//Rutas para la pestaña crear
router.post('/JornadaNueva', admin.JornadaNueva)
router.post('/Jornadas', admin.GetJornadas)
router.post('/JornadasAnio', admin.JornadasAnio)
router.post('/JornadaEspecifica', admin.GetJornadaEspecifica)
router.post('/modificarJornada', admin.modificarJornada)
router.post('/eliminarJornada', admin.eliminarJornada)
router.post('/CrearCapacitacion', admin.CrearCapacitacion)
router.post('/modificarCapacitacion', admin.modificarCapacitacion)
router.post('/Agendar', admin.Agendar)
router.post('/modificarAgenda', admin.modificarAgenda)
router.post('/getAgenda', admin.getAgenda)
router.post('/Capacitaciones', admin.Capacitaciones)
router.post('/CapacitacionesXJornada', admin.CapacitacionesPorJornada)
router.post('/CapacitacionReciente', admin.CapacitacionReciente)
router.post('/Actualizar0', admin.Actualizar0)
router.post('/Actualizar1', admin.Actualizar1)
router.post('/GetInscripciones', admin.getInscripciones)

module.exports = router