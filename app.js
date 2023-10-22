const express = require("express");
const app = express();
const port = 3000;

// Middleware para gestionar métodos HTTP válidos
app.use((req, res, next) => {
  if (
    req.method !== "GET" &&
    req.method !== "POST" &&
    req.method !== "PUT" &&
    req.method !== "DELETE"
  ) {
    return res.status(400).json({ message: "Método HTTP no válido" });
  }
  next();
});

app.get("/", (req, res) => {
  res.send("¡Bienvenido a mi aplicación Express!");
});

// Importa los routers
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");

// Agrega los routers a las rutas principales
app.use("/list-view", listViewRouter);
app.use("/list-edit", listEditRouter);

app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
