const Tarea = require("../model/tareaModel");

const actualizarTareaController = async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.status(200).json(tarea);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = actualizarTareaController;
