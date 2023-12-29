const express = require("express");
const router = express.Router();
const usuario= require("../Controllers/userTareas.controllers");

router.get("/Prueba",usuario.Prueba);
router.post("/getDepartamentos", usuario.GetDepartamentos)
router.post("/getMunicipios", usuario.GetMunicipios)
router.post("/tiposUsuarios", usuario.tiposUsuarios)
router.post("/RegistrarUsuario", usuario.RegistrarUsuario)
router.post("/ModificarUsuario", usuario.ModificarUsuario)
router.post("/GetUsuario", usuario.GetUser)
router.post("/GetCapacitaciones", usuario.GetCapacitaciones)
//router.post("/AsignacionAuto", usuario.AsignacionAuto)
router.post("/Inscripcion", usuario.Inscripcion)
router.post("/CalendarioDiplomado", usuario.CalendarioDiplomado)
router.post("/Diplomas", usuario.Diplomas)
router.post("/Diplomados", usuario.Diplomados)
router.post('/GenerarPDF', usuario.GenerarPDF)
router.post('/GenerarDiplomadoPDF', usuario.GenerarDiplomadoPDF)


module.exports = router