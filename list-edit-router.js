const express = require("express");
const listEditRouter = express.Router();

const tarea = [
  {
    id: "123456",
    completado: false,
    descripcion: "Hacer galletas",
  }
];

listEditRouter.post("/create", (req, res) => {
  const nuevaTarea = req.body;
  tarea.push(nuevaTarea);
  res.json(nuevaTarea);
});

listEditRouter.delete("/delete/:id", (req, res) => {
  const idTarea = req.params.id;
  const tareaIndex = tarea.findIndex((tarea) => tarea.id === idTarea);
  if (tareaIndex !== -1) {
    tarea.splice(tareaIndex, 1);
  }
  res.json({ message: "Tarea eliminada" });
});

listEditRouter.put("/update/:id", (req, res) => {
  const idTarea = req.params.id;
  const actualizaTarea = req.body;

  for (let i = 0; i < tarea.length; i++) {
    if (tarea[i].id === idTarea) {
        tarea[i] = actualizaTarea;
      return res.json(actualizaTarea);
    }
  }

  res.status(404).json({ message: "Tarea no encontrada" });
});

module.exports = listEditRouter;
