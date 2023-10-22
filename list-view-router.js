const express = require("express");
const listViewRouter = express.Router();

const tarea = [
  {
    id: "123456",
    completado: false,
    descripcion: "Lavar el carro",
  },
  {
    id: "789012",
    completado: true,
    descripcion: "Leer el quijote",
  }
];

listViewRouter.get("/completed", (req, res) => {
  const tareaCompleta = tarea.filter((tarea) => tarea.completado);
  res.json(tareaCompleta);
});

listViewRouter.get("/incomplete", (req, res) => {
  const tareaIncompleta = tarea.filter((tarea) => !tarea.completado);
  res.json(tareaIncompleta);
});

module.exports = listViewRouter;
