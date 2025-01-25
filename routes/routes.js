const express = require("express");
const router = express.Router();

// Importar los controladores
const crearTareaController = require("../controller/crearTareaController");
const actualizarTareaController = require("../controller/actualizarTareaController");
const obtenerTareasController = require("../controller/obtenerTareaController");
const eliminarTareaController = require("../controller/eliminarTareaController");

// Rutas CRUD
router.post("/crear", crearTareaController);
router.put("/actualizar/:id", actualizarTareaController);
router.get("/tareas", obtenerTareasController);
router.delete("/eliminar/:id", eliminarTareaController);

module.exports = router;
