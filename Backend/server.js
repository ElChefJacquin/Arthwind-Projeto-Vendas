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
const port = 21101;
const cors = require("cors");
const nodemailer = require("nodemailer");
const e = require("express");
const jwt = require("jsonwebtoken");
const codificar = require("./funcs/encode");
const decodificar = require("./funcs/decode");
const gerartoken = require('./funcs/recuperarsenha.js')
const validartoken = require('./funcs/recuperardecode.js');
const bcrypt = require('bcryptjs');
const https = require('https');
const fs = require('fs');
const rateLimit = require("express-rate-limit");
const documentacao = require("./docs.json")
setupDB();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "calangostech01@gmail.com",
    pass: "mxuyhshgsgiocusj",
  },
});

const limiter = rateLimit({
	windowMs: 60 * 1000,
	limit: 5,
        message: "Você excedeu o limite de tentativas de login, tente novamente em 1 minuto.",
});

const chaveprivada = fs.readFileSync('apivendas.me.pem', 'utf8');
const certificado = fs.readFileSync('apivendas.me.pem', 'utf8');
const credenciais = { key: chaveprivada, cert: certificado };

const httpsServer = https.createServer(credenciais, app);

httpsServer.listen(21102, () => {
  console.log('Servidor HTTPS na porta 21102');
})

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

app.listen(port, () => {
  console.log(`Servidor na porta ${port}`);
});

app.get("/", async (req, res) => {
  res.send("API Fast Vendas - Made in Earth by Joaquim Neto")
})

app.get("/docs", async (req, res) => {
  res.json(documentacao)
})

app.post("/registrar", async (req, res) => {
  try {
    const { usuario, senha, email } = req.body;
    const senhacodificada = await bcrypt.hash(senha, 10);

    const novousuario = await Usuario.query().insert({
      usuario: usuario,
      senha: senhacodificada,
      email: email,
    });

    if (novousuario) {
      res.status(200);
      res.send("Registrado com sucesso!");
    } else {
      res.status(500);
      res.send("Ocorreu um erro ao processar a solicitação!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

app.post("/login", limiter, async (req, res) => {
  try {
    const { user, pass } = req.body;
    const usuario = await Usuario.query().findOne({
      usuario: user,
    });
    if (usuario) {
      const senhafinal = await bcrypt.compare(pass, usuario.senha);
      if (senhafinal) {
        res.send(codificar(usuario.id)).status(200);
        return;
      } 
    }
    res.status(404).send("Usuário ou senha incorretos!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro no servidor");
  }
});

app.post("/envioemail/", async (req, res) => {
  try {
    const email = req.body.email;
  
  const verificacao = await Usuario.query()
    .select("usuario")
    .where("email", "=", email);

    if ((verificacao.length) === 0) {
      res.status(200);
      res.send("Ok!");
      return;
    }

    const novotoken = gerartoken(verificacao[0].usuario);

    console.log(novotoken)

    sendRecoveryEmail(email, novotoken, verificacao[0].usuario);

    res.status(200)
    res.send("Ok!")
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json("Erro Interno!");
  }

});

app.post("/recuperacaofinal", async (req, res) => {
  try {
    const { token } = req.body;
    const { senha } = req.body;

    const decoded = validartoken(token);
    console.log(decoded)

    const verificar = await Usuario.query()
      .select("usuario")
      .where("usuario", "=", decoded.usuario);

    if (verificar.length === 0) {
      res.status(404);
      res.send("Não existe uma conta com esse email!");
      return;
    }

    const senhacodificada = await bcrypt.hash(senha, 10);

    await Usuario.query()
      .patch({ senha: senhacodificada })
      .where("usuario", "=", decoded.usuario);

    res.status(200);
    res.send("Senha alterada com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json("Erro Interno!");
  }
});

async function sendRecoveryEmail(userEmail, token, user) {
  try {
    const info = await transporter.sendMail({
      from: "calangostech01@gmail.com",
      to: userEmail,
      subject: "Recuperação de usuário",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  text-align: center;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #fff;
                  border: 1px solid #ddd;
                  border-radius: 5px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  color: #333;
              }
              p {
                  color: #666;
              }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #007BFF;
                  color: #fff;
                  text-decoration: none;
                  border-radius: 5px;
                  
              }
              .button:hover {
                  background-color: #0056b3;
              }
              .footer {
                  text-align: center;
                  margin-top: 20px;
              }
              .footer a {
                  color: #007BFF;
                  text-decoration: none;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Recuperação de Senha</h1>
              <p>Olá ${user}, Você solicitou a recuperação da sua senha. Clique no botão abaixo para redefinir sua senha:</p>
              <a class="button" href="projetovendas.joaquim.dev/recuperarsenha?token=${token}">Redefinir Senha</a>
              <div class="footer">
                  <p>Se você não solicitou a recuperação de senha, ignore este e-mail.</p>
                  <a href="https://projetovendas.joaquim.dev/">Fast Vendas</a>
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
  try {
    const { nome } = req.body;
  const usuario = decodificar(req.headers.authorization);
  if (!usuario || !nome || isNaN(usuario)) {
    res.status(400).send("Solicitação incompleta ou invalida");
  }
  const categoria = await Categoria.query().insert({
    categoria: nome,
    usuario: usuario,
  });
  if (categoria) {
    res.send("Categoria cadastrada com sucesso!");
    res.status(200);
  } else {
    res.status(500);
    res.status("Ocorreu um erro ao cadastrar a categoria!");
  }
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

app.post("/cadprodutos", async (req, res) => {
  try {
    const usuario = decodificar(req.headers.authorization);
    const { nome, quantidade, categoria, precocompra, precovenda } = req.body;
    if (!categoria) {
      res.status(400).send("A categoria é obrigatória.");
      return;
    }
    const produto = await Produto.query().insert({
      nome: nome,
      quantidade: quantidade,
      categoria: categoria,
      usuario: usuario,
      precocompra: precocompra,
      precovenda: precovenda,
    });
    if (produto) {
      res.status(200).send("Produto cadastrado com sucesso!");
    } else {
      res.status(500).send("Ocorreu um erro ao processar a solicitação!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

app.post("/cadvenda", async (req, res) => {
  try {
    const usuario = decodificar(req.headers.authorization);
    const { produto, quantidade, lucrototal, precototal } = req.body;

    const verificarestoque = await Produto.query()
      .select("quantidade")
      .where({ id: produto });

    if (quantidade > verificarestoque.quantidade) {
      res.status(400).send("Quantidade não disponível em estoque!");
      return;
    }

    const venda = await Venda.query()
      .insert({
        usuario: usuario,
        quantidade: quantidade,
        lucrototal: lucrototal,
        precototal: precototal,
      })
      .returning("id");
    console.log(venda.id);
    if (venda) {
      const vendaassociacao = await ProdutoVenda.query().insert({
        produto_fk: produto,
        venda_fk: venda.id,
        usuario: usuario,
      });
      if (vendaassociacao) {
        await Produto.query()
          .where({ id: produto })
          .decrement("quantidade", quantidade);

        res.status(200).send("Venda cadastrada com sucesso!");
      } else {
        res.status(500);
        res.status("Ocorreu um erro ao processar a solicitação (associacao)");
      }
    } else {
      res.status(500);
      res.status("Ocorreu um erro ao processar a solicitação (venda)");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

app.get("/listarprodutos/", async (req, res) => {
  try {
    const usuario = decodificar(req.headers.authorization);
  const produtos = await Produto.query()
  .where("usuario", "=", `${usuario}`)
  .andWhere("visivel", "=", true);
  if (produtos.length > 0) {
    res.json(produtos);
  } else {
    res.status(404);
    res.send("Erro");
  }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

app.get("/listarcategorias/", async (req, res) => {
  try {
    const usuario = decodificar(req.headers.authorization);
    const categorias = await Categoria.query().where(
      "usuario",
      "=",
      `${usuario}`
    );
    if (categorias) {
      res.json(categorias);
    } else {
      res.status(404);
      res.send("Erro");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

app.get("/listarvendas/", async (req, res) => {
  try {
    const usuario = decodificar(req.headers.authorization);
    const vendas = await ProdutoVenda.query()
      .select("venda.*", "produto.nome as nome_produto")
      .join("venda", "produto_venda.venda_fk", "venda.id")
      .join("produto", "produto_venda.produto_fk", "produto.id")
      .where("produto_venda.usuario", usuario);

    if (vendas.length > 0) {
      res.json(vendas);
    } else {
      res
        .status(404)
        .send("Nenhuma venda encontrada para o usuário especificado.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Ocorreu um erro ao buscar as vendas do usuário.");
  }
});

app.get("/listarvendasmes/", async (req, res) => {
  try {
    const usuarioId = decodificar(req.headers.authorization);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 30);

    const endDate = new Date(today);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const vendasPorDia = await Venda.query()
      .select(Venda.raw("DATE(created_at) as data"))
      .sum("lucrototal as lucrodiario")
      .where("created_at", ">=", thirtyDaysAgo)
      .andWhere("usuario", "=", `${usuarioId}`)
      .groupBy(Venda.raw("DATE(created_at)"))
      .orderBy(Venda.raw("DATE(created_at)"), "asc")
      .limit(30);

    if (vendasPorDia.length > 0) {
      res.json(vendasPorDia);
    } else {
      res.status(404).json({
        error: "Nenhuma venda encontrada para o usuário neste período.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocorreu um erro ao buscar as vendas." });
  }
});

app.get("/listarvendasano/", async (req, res) => {
  try {
    const usuarioId = decodificar(req.headers.authorization);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 365);

    const endDate = new Date(today);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 365);

    const vendasPorDia = await Venda.query()
      .select(Venda.raw("DATE(created_at) as date"))
      .sum("lucrototal as dailyProfit")
      .where("created_at", ">=", thirtyDaysAgo)
      .groupBy(Venda.raw("DATE(created_at)"))
      .orderBy(Venda.raw("DATE(created_at)"), "asc")
      .limit(365);

    if (vendasPorDia.length > 0) {
      res.json(vendasPorDia);
    } else {
      res.status(404).json({
        error: "Nenhuma venda encontrada para o usuário neste período.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocorreu um erro ao buscar as vendas." });
  }
});

app.delete("/deletarproduto/:id", async (req, res) => {
  try {
    const user = decodificar(req.headers.authorization);
    const { id } = req.params;

    const Associadas = await ProdutoVenda.query()
      .select("produto_venda.*")
      .join("produto", "produto_venda.produto_fk", "produto.id")
      .where("produto_venda.produto_fk", "=", `${id}`)
      .andWhere("produto_venda.usuario", "=", `${user}`);

    if (Associadas.length > 0) {
      res.status(406).send("Não é possível deletar um produto com vendas.");
      return;
    }

    const produto = await Produto.query()
      .deleteById(id)
      .where("usuario", "=", `${user}`);

    if (produto) {
      res.status(200).send("Produto deletado com sucesso!");
    } else {
      res.status(500).send("Ocorreu um erro ao processar a solicitação!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

app.delete("/ocultarproduto/:id", async (req, res) => {
  try {
    const user = decodificar(req.headers.authorization);
    const { id } = req.params;

    const produto = await Produto.query()
      .findById(id)
      .where("usuario", "=", `${user}`)
      .patch({ visivel: false });

    if (produto) {
      res.status(200).send("Produto ocultado com sucesso!");
    } else {
      res.status(500).send("Ocorreu um erro ao processar a solicitação!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

app.delete("/deletarcategoria/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = decodificar(req.headers.authorization);
    const categoria = await Categoria.query()
      .deleteById(id)
      .andWhere("usuario", "=", `${usuario}`);
    if (categoria) {
      res.status(200).send("Categoria deletada com sucesso!");
    } else {
      res.status(500).send("Ocorreu um erro ao processar a solicitação!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

app.put("/editarproduto/:id", async (req, res) => {
  try {
    const user = decodificar(req.headers.authorization);
    const { id } = req.params;
    const { nome, quantidade, categoria, precocompra, precovenda } = req.body;
    const produto = await Produto.query()
      .findById(id)
      .where("usuario", "=", `${user}`)
      .patch({
        nome: nome,
        quantidade: quantidade,
        categoria: categoria,
        precocompra: precocompra,
        precovenda: precovenda,
      });
    if (produto) {
      res.status(200).send("Produto editado com sucesso!");
    } else {
      res.status(500).send("Ocorreu um erro ao processar a solicitação!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

app.put("/editarcategoria/", async (req, res) => {
  try {
    const { id } = req.body;
    const { nome } = req.body;
    const { usuario } = decodificar(req.headers.authorization);
    const categoria = await Categoria.query().findById(id).patch({
      categoria: nome,
      usuario: usuario,
    });
    if (categoria) {
      res.status(200).send("Categoria editada com sucesso!");
    } else {
      res.status(500).send("Ocorreu um erro ao processar a solicitação!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});
