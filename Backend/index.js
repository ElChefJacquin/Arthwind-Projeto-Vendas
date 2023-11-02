const express = require("express");
const bodyParser = require("body-parser");
const knex = require("knex");
const knexConfig = require("./db/knex");
const setupDB = require("./db/db_setup.js");
const Usuario = require("./db/model/user.js");
const Produto = require("./db/model/produto.js");
const ProdutoVenda = require("./db/model/produto_venda.js");
const Venda = require("./db/model/venda.js");
const Categoria = require("./db/model/categoria.js");
const app = express();
const port = 3002;
const cors = require("cors");
const nodemailer = require("nodemailer");
const e = require("express");
app.use(bodyParser.json());
setupDB();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "calangostech01@gmail.com",
    pass: "mxuyhshgsgiocusj",
  },
});

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.redirect("http://127.0.0.1:5500/index.html");
});

app.listen(port, () => {
  console.log(`Servidor na porta ${port}`);
});

app.post("/login", async (req, res) => {
  const { user, pass } = req.body;
  const usuario = await Usuario.query().findOne({
    user: user,
    pass: pass,
  });
  if (usuario) {
    res.send(usuario);
  } else {
    res.status(404);
    res.send("Erro");
  }
});

app.post("/registrar", async (req, res) => {
  const { user, pass, email } = req.body;
  const usuario = await Usuario.query.insert({
    user: user,
    pass: pass,
    email: email,
  });
  if (usuario) {
    res.send(200);
    res.send("Registrado com sucesso!");
  } else {
    res.status(500);
    res.status("Ocorreu um erro ao processar a solicitação!");
  }
});

app.post("/recuperarsenha/", async (req, res) => {
  try {
    const { email } = req.body;
    const verificar = await Usuario.query()
      .select("email")
      .where("email", "=", `${email}`);
    if (verificar.length == 0) {
      res.status(404);
      res.send("Não existe uma conta com esse email!");
      return;
    } else {
      res.status(200);
      const usuariorecu = await Usuario.query().where("email", "=", `${email}`);
      sendRecoveryEmail(usuariorecu[0].email, usuariorecu[0].pass, usuariorecu[0].user);
      res.send("Finalizado, sucesso!");
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json("Erro Interno!");
  }
});

async function sendRecoveryEmail(userEmail, pass, user) {
  try {
    const info = await transporter.sendMail({
      from: "calangostech01@gmail.com",
      to: userEmail,
      subject: "Recuperação de usuário",
      html: `
        <!DOCTYPE html>
        <html lang="pt-br">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <!-- Link para o Bootstrap -->
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
          <title>Recuperação de Usuário</title>
        </head>
        
        <body>
          <div class="container">
            <div class="row">
              <div class="col">
                <h3 class="mt-3">Recuperação de Usuário</h3>
                <p>Olá ${user}, você solicitou a recuperação de usuário.</p>
                <h4>Segue abaixo a sua senha</h4>
                <p class="lead">${pass}</p>
              </div>
            </div>
          </div>
        </body>
        
        </html>      
        `,
    });

    console.log(`E-mail de recuperação enviado com sucesso! ${info.response}`);
  } catch (err) {
    console.error(`Erro ao enviar o e-mail de recuperação: ${err}`);
  }
}

app.post("/cadcategoria", async (req, res) => {
  const { nome, usuario } = req.body;
  const categoria = await Categoria.query().insert({
    categoria: nome,
    usuario: usuario
  });
  if (categoria) {
    res.send(200);
    res.send("Categoria cadastrada com sucesso!");
  } else {
    res.status(500);
    res.status("Ocorreu um erro ao processar a solicitação!");
  }
});

app.post("/cadprodutos", async (req, res) => {
  const { nome, quantidade, usuario, categoria } = req.body;
  const produto = await Produto.query().insert({
    nome: nome,
    quantidade: quantidade,
    categoria: categoria,
    usuario: usuario
  });
  if (produto) {
    res.send(200);
    res.send("Produto cadastrado com sucesso!");
  } else {
    res.status(500);
    res.status("Ocorreu um erro ao processar a solicitação!");
  }
});

app.post("/cadvenda", async (req, res) => {
  const { usuario, produto, quantidade, lucrototal, precototal } = req.body;
  const venda = await Venda.query()
    .insert({
      nomecliente: usuario,
      produto: produto,
      quantidade: quantidade,
      lucrototal: lucrototal,
      precototal: precototal,
    })
    .returning("id");
  if (venda) {
    const vendaassociacao = await ProdutoVenda.query().insert({
      produto_fk: produto,
      venda_fk: venda,
    });
    if (vendaassociacao) {
      res.send(200);
      res.send("Venda cadastrada com sucesso!");
    } else {
      res.status(500);
      res.status("Ocorreu um erro ao processar a solicitação (associacao)");
    }
  } else {
    res.status(500);
    res.status("Ocorreu um erro ao processar a solicitação (venda)");
  }
});

app.get("/listarprodutos/:usuario", async (req, res) => {
  const { usuario } = req.params;
  const produtos = await Produto.query().where("usuario", "=", `${usuario}`);
  if (produtos) {
    res.json(produtos);
  } else {
    res.status(404);
    res.send("Erro");
  }
});

app.get("/listarcategorias/:usuario", async (req, res) => {
  const { usuario } = req.params;
  const categorias = await Categoria.query().where("usuario", "=", `${usuario}`);
  if (categorias) {
    res.json(categorias);
  } else {
    res.status(404);
    res.send("Erro");
  }
});

app.get("/listarvendas/:usuario", async (req, res) => {
  const { usuario } = req.params;
  const vendas = 
  await Venda.query()
  .where("nomecliente", "=", `${usuario}`);
  if (vendas) {
    res.json(vendas);
  } else {
    res.status(404);
    res.send("Erro");
  }
});