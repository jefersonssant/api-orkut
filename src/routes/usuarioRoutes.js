const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuarioController");
const validarUsuarios = require("../middlewares/validacao/usuarios");

router.post("/usuarios", validarUsuarios, controller.criarUsuario);
router.get("/usuarios", controller.listarUsuarios);

module.exports = router;