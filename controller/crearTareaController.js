const Tarea = require("../models/tareaModel");

const crearTareaController = async (req, res) => {
  try {
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.status(201).json(tarea);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = crearTareaController;
