const express = require("express");
const { verificar } = require("../auth/Auth.js");
const crearTareaController = require("../controller/crearTareaController");
const actualizarTareaController = require("../controller/actualizarTareaController");
const obtenerTareasController = require("../controller/obtenerTareaController");
const eliminarTareaController = require("../controller/eliminarTareaController");

const router = express.Router();

// Rutas CRUD
router.post("/crear", verificar, crearTareaController);
router.put("/actualizar/:id", verificar, actualizarTareaController);
router.get("/tareas", verificar, obtenerTareasController);
router.delete("/eliminar/:id", verificar, eliminarTareaController);

module.exports = router;
