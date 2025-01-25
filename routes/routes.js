const express = require("express");
const router = express.Router();

// Importar los controladores
const crearTareaController = require("../controller/crearTareaController");
const actualizarTareaController = require("../controller/actualizarTareaController");
const obtenerTareasController = require("../controller/obtenerTareaController");

// Rutas CRUD
router.post("/tareas", crearTareaController);
router.put("/actualizar/:id", actualizarTareaController);
router.get("/listar", obtenerTareasController);

module.exports = router;
