const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");

const verificar = Router();
verificar.use((req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ status: false, errors: ["No autorizado"] });
  }

  if (token.startsWith("Bearer")) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) {
      return res
        .status(401)
        .json({ status: false, errors: ["Token no válido"] });
    }
    req.decoded = decoded; // Asigna los datos decodificados
    next(); // Continúa al siguiente middleware o controlador
  });
});

module.exports = { verificar };
