require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const usuarioRoutes = require("./routes/usuarioRoutes");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");


const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Rede Social!</h1>");
});

app.use(usuarioRoutes);
app.use(authRoutes);
app.use(postRoutes);



module.exports = app;
