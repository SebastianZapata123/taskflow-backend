const express = require("express");
const router = express.Router();

// Importar los controladores
const crearTareaController = require("../controllers/crearTareaController");

// Rutas CRUD
router.post("/tareas", crearTareaController);

module.exports = router;
