const express = require("express");
const server = express();

// Middlewares globais
server.use((req, res, next) => {
  console.log("Requisição realizada com sucesso.");

  next();
});

server.use((req, res, next) => {
  console.log(`${req.method} :: ${req.url}`);

  next();
});

server.use((req, res, next) => {
  console.time("timeLogger");

  next();

  console.timeEnd("timeLogger");
});

// server.use((req, res, next) => {
//   const { name } = req.query;

//   if (!name) {
//     return res.status(400).json({ error: "Name param not found" });
//   }

//   next();
// });


// Middlewares locais
const checkNameExists = (req, res, next) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Parâmetro de nome não encontrado" });
  }

  next();
};

const checkUserPermission = (req, res, next) => {
  const usersAllowed = ["Admin", "Alan"];
  const { name } = req.query;

  if (!usersAllowed.includes(name)) {
    return res
      .status(401)
      .json({ error: "O usuário não tem permissão para acessar este recurso" });
  }

  next();
};

server.get("/hello", checkNameExists, checkUserPermission, (req, res) => {
  const { name } = req.query;

  return res.json({
    title: "Hello!",
    message: `Olá ${name} tudo bem com você!?`
  });
});

server.listen(3000);
