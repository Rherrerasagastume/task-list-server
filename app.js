const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
app.use("/favicon.ico", express.static(path.join(__dirname, "favicon.ico")));


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
