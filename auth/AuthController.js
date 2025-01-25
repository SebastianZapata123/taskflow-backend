const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const { JWT_SECRET, JWT_EXPIRES } = require("../config.js");

const schema = new mongoose.Schema(
  {
    nombre: String,
    correo: String,
    password: String, // Cambio: asegúrate de usar 'password' en lugar de 'contraseña'
  },
  { versionKey: false }
);

const UserModel = mongoose.model("user", schema);

const validar = (nombre, correo, contraseña) => {
  let err = [];
  if (nombre !== null && (nombre === undefined || nombre.trim() === "")) {
    err.push("El nombre no puede estar vacío");
  }

  if (correo === undefined || correo.trim() === "") {
    err.push("El correo no puede estar vacío");
  }

  if (
    contraseña === undefined ||
    contraseña.trim() === "" ||
    contraseña.length < 8
  ) {
    err.push(
      "La contraseña no puede estar vacía y debe tener al menos 8 caracteres"
    );
  }
  return err;
};

const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;

    // Validar los datos de entrada
    const validacion = validar(nombre, correo, contraseña);
    if (validacion.length === 0) {
      // Hash de la contraseña
      const hashedPassword = await bcryptjs.hash(contraseña, 8);

      // Crear nuevo usuario
      const nuevoUsuario = new UserModel({
        nombre,
        correo,
        password: hashedPassword,
      });
      await nuevoUsuario.save();

      return res
        .status(200)
        .json({ status: true, message: "Usuario creado exitosamente" });
    } else {
      return res.status(400).json({
        status: false,
        message: validacion,
      });
    }
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Validar los datos de entrada
    let validation = validar(null, correo, contraseña); // 'nombre' no es necesario en el login
    if (validation.length === 0) {
      // Buscar usuario por correo
      const info = await UserModel.findOne({ correo });
      if (!info || !(await bcryptjs.compare(contraseña, info.password))) {
        return res
          .status(401)
          .json({ status: false, err: ["Credenciales incorrectas"] });
      }

      // Generar token JWT
      const token = jwt.sign({ id: info._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES,
      });

      // Crear objeto de usuario para la respuesta
      const usuario = {
        id: info._id,
        nombre: info.nombre,
        correo: info.correo,
        token,
      };

      return res.status(200).json({
        status: true,
        data: usuario,
        message: "Inicio de sesión exitoso",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: validation,
      });
    }
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = { crearUsuario, login };
