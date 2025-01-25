const express = require("express");
const router = express.Router();
const { crearUsuario, login } = require("../auth/AuthController");

router.post("/crearUsuario", crearUsuario);
router.post("/login", login);

module.exports = router;
