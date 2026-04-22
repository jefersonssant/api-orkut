const express = require("express");
const router = express.Router();
const controller = require("../controllers/postController");
const auth = require("../middlewares/auth");
const validarPost = require("../middlewares/validacao/post");

router.get("/posts", controller.listarPosts);
router.post("/posts", auth, validarPost, controller.criarPost);
router.put("/posts/:id", auth, validarPost, controller.atualizarPost);
router.delete("/posts/:id", auth, controller.deletarPost);

module.exports = router