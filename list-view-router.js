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

// Middleware para validar los parámetros
listViewRouter.param("id", (req, res, next, id) => {
  if (!id || !/^\d+$/.test(id)) {
    return res.status(400).json({ message: "Parámetro no válido" });
  }
  next();
});

listViewRouter.get("/completed/:id", (req, res) => {
  const tareaId = req.params.id;
  const tareaCompleta = tarea.filter((tarea) => tarea.id === tareaId && tarea.completado);
  res.json(tareaCompleta);
});

listViewRouter.get("/incomplete/:id", (req, res) => {
  const tareaId = req.params.id;
  const tareaIncompleta = tarea.filter((tarea) => tarea.id === tareaId && !tarea.completado);
  res.json(tareaIncompleta);
});

module.exports = listViewRouter;
