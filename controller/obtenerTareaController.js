const Tarea = require("../model/tareaModel");

const obtenerTareasController = async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.status(200).json(tareas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = obtenerTareasController;
