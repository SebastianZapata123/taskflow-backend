const express = require("express");
const router = express.Router();

// Importar los controladores
const crearTareaController = require("../controller/crearTareaController");
const actualizarTareaController = require("../controller/actualizarTareaController");

// Rutas CRUD
router.post("/tareas", crearTareaController);
router.put("/actualizar", actualizarTareaController);

module.exports = router;
