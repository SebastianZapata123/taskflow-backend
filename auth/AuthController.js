import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import { JWT_SECRET, JWT_EXPIRES } from "../config";

const schema = new mongoose.Schema(
  {
    nombre: String,
    correo: String,
    password: String,
  },
  { versionKey: false }
);

const UserModel = new mongoose.model("user", schema);

const validar = (nombre, correo, contraseña) => {
  let err = [];
  if (nombre === undefined || nombre.trim() === "") {
    err.push("El nombre no puede estar vacio");
  }

  if (correo === undefined || correo.trim() === "") {
    err.push("El correo no puede estar vacio");
  }

  if (
    contraseña === undefined ||
    contraseña.trim() === "" ||
    contraseña.length < 8
  ) {
    err.push("La contraseña no puede estar vacia, minimo 8 caracteres");
  }
  return err;
};

const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    let validacion = validar(nombre, correo, contraseña);
    if ((validacion = "")) {
      let pass = await bcryptjs.hash(contraseña, 8);
      const nuevoUsuario = new UserModel({
        nombre: nombre,
        correo: correo,
        contraseña: pass,
      });
      await nuevoUsuario.save();
      return res.status(200).json({ status: true, message: "Usuario Creado" });
    } else {
      return res.status(400).json({
        status: false,
        message: validacion,
      });
    }
  } catch (err) {
    return res.status(500).json({ status: false, message: [err.message] });
  }
};

module.exports = crearUsuario;
