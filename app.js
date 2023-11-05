const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const app = express();
const port = 3000;



app.get("/", (req, res) => {
  res.send("¡Bienvenido a mi aplicación Express!");
});
const taskApi = require("./task-api");
app.use("/api", taskApi); 

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

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Usuarios predefinidos (esto puede ser una base de datos en una aplicación real)
const users = [
  {
    id: 1,
    username: "usuario1",
    password: "contraseña1",
  },
  {
    id: 2,
    username: "usuario2",
    password: "contraseña2",
  },
];

// Middleware para verificar el token JWT
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: "Token no proporcionado" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }

    // Agrega la información del usuario decodificado al objeto de solicitud
    req.user = decoded;

    next();
  });
}

// Ruta de autenticación (login)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Verifica las credenciales del usuario
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  // Genera un token JWT con el ID del usuario
  const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

  res.json({ token });
});

// Ruta protegida
app.get("/protegido", verifyToken, (req, res) => {
  res.json({ message: "Ruta protegida" });
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
