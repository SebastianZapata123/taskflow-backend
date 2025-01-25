const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  prioridad: String,
  estado: String,
  personaEncargada: String,
});

// Crear el modelo de la tarea
const Tarea = mongoose.model("Tarea", tareaSchema);

module.exports = Tarea;
