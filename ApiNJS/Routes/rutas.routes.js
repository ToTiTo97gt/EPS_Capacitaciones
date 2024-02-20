const express = require("express");
const router = express.Router();
const admin= require("../Controllers/tareas.controllers");

router.post("/RegistrarAdmin", admin.RegistrarAdmin);
router.post("/GetAdminUser",admin.AdminUser);
router.post("/NuevoDatos",admin.NuevosDatos);
router.post("/ModificarDatos",admin.ModificarDatos);
router.post("/CambiarPass",admin.CambiarPass);
router.post("/VerificarMail", admin.VerificarMail)
router.post("/RecuperarContra", admin.RecuperarContra)
router.post("/GetAdminPermisos", admin.AdminPermisos);
router.post("/GetAdminLista", admin.AdminLista);
router.post("/permisos", admin.Permisos);
router.post("/permisosAdmin", admin.PermisosAdmin);
router.post("/revocar", admin.RevocarPermiso)
router.post("/AsignarPermiso", admin.AsignarPermiso)
router.post("/BloquearAdmin", admin.BloquearAdmin)
//Rutas para la pestaña crear
router.post('/JornadaNueva', admin.JornadaNueva)
router.post('/Jornadas', admin.GetJornadas)
router.post('/JornadasAnio', admin.JornadasAnio)
router.post('/JornadaEspecifica', admin.GetJornadaEspecifica)
router.post('/modificarJornada', admin.modificarJornada)
router.post('/eliminarJornada', admin.eliminarJornada)
router.post('/CrearCapacitacion', admin.CrearCapacitacion)
router.post('/modificarCapacitacion', admin.modificarCapacitacion)
router.post('/EstadoCapacitacion', admin.EstadoCapacitacion)
router.post('/Agendar', admin.Agendar)
router.post('/modificarAgenda', admin.modificarAgenda)
router.post('/getAgenda', admin.getAgenda)
router.post('/Capacitaciones', admin.Capacitaciones)
router.post('/CapacitacionesXJornada', admin.CapacitacionesPorJornada)
router.post('/CapacitacionReciente', admin.CapacitacionReciente)
router.post('/DiplomasCapacitaciones', admin.DiplomaCapacitaciones)
router.post('/DiplomasDiplomados', admin.DiplomaDiplomados)
router.post('/Actualizar0', admin.Actualizar0)
router.post('/Actualizar1', admin.Actualizar1)
router.post('/GetInscripciones', admin.getInscripciones)
router.post('/GetUsuarios', admin.getUsuarios)
router.post('/Asistencias', admin.Asistencias)
router.post('/CargarPlantilla', admin.CargarPlantilla)
router.post('/CargarPlantillaDiplo', admin.CargarPlantillaDiplo)
router.post('/AsignarDiplomas', admin.AsignarDiplomas)
router.post('/ListaActual', admin.ListaActual)
router.post('/CambiarTipo', admin.CambiarTipo)
router.post('/CambiarEstado', admin.CambiarEstado)
router.post('/ayudas', admin.solicitudesAyuda)
router.post('/FiltrarAyudas', admin.FiltrarAyudas)
router.post('/EstadoAyuda', admin.EstadoAyuda)


module.exports = router