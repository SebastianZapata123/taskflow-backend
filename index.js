require("dotenv").config(); // Cargar variables de entorno
const express = require("express");
const mongoose = require("mongoose");
const Tarea = require("./model/tareaModel");

const app = express();
// Importar las rutas
const tareaRoutes = require("./routes/routes");

// Middlewares para analizar JSON
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB 🚀"))
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
    process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
  });

// USO DE LAS RUTAS POST GET DELETE UPDATE

app.use("/api", tareaRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
