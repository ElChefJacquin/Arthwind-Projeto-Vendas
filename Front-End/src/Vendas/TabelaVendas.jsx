import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Cookies from "js-cookie";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ip from "../assets/funcs/ip";

export default function TabelaVendas() {
  const toastId = React.useRef(null);
  const options = {
    headers: { Authorization: `${Cookies.get("token")}` },
  };
  const [categorias, setCategoria] = React.useState([]);
  const [dados, setDados] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [ultimas, setUltimas] = useState([]);
  const [carrinholimpo, setCarrinhoLimpo] = useState(false);
  const [att, setAtt] = useState(false);
  const navigate = useNavigate();

  function incrementocarrinho(
    usuario,
    produto,
    quantidade,
    lucrototal,
    precototal,
    nome
  ) {
    setCarrinho([
      ...carrinho,
      {
        usuario: usuario,
        produto: produto,
        quantidade: quantidade,
        lucrototal: lucrototal,
        precototal: precototal,
        nome: nome,
      },
    ]);
  }

  function limparcarrinho() {
    const confirmacao = confirm("Deseja realmente limpar o carrinho?");
    if (confirmacao) {
      if (carrinho.length === 0) {
        toast.error("O carrinho já está vazio");
        return;
      }
      setCarrinho([]);
      setCarrinhoLimpo(!carrinholimpo);
    } else {
      toast.info("Limpeza de carrinho cancelada");
    }
  }
  

  function adicionarAoCarrinho(row) {
    let quantidadecarrinho = Number(prompt("Qual a quantidade que deseja adicionar?"));
    
    if (quantidadecarrinho > row.quantidade) {
      toast.error("Quantidade indisponível");
      return;
    }
    
    if (quantidadecarrinho > 0 && !isNaN(quantidadecarrinho)) {
      const existingItemIndex = carrinho.findIndex((item) => item.produto === row.id);
  
      if (existingItemIndex !== -1) {
        carrinho[existingItemIndex].quantidade += quantidadecarrinho;
        const dadosItem = dados.find((item) => item.id === row.id);
        if (dadosItem) {
          dadosItem.quantidade -= quantidadecarrinho;
        } else {
          toast.error("Produto não encontrado em 'dados'");
        }
        setCarrinho([...carrinho]);
      } else {
        incrementocarrinho(
          1,
          row.id,
          quantidadecarrinho,
          (row.precovenda - row.precocompra) * quantidadecarrinho,
          row.precovenda * quantidadecarrinho,
          row.nome
        );
        const dadosItem = dados.find((item) => item.id === row.id);
        if (dadosItem) {
          dadosItem.quantidade -= quantidadecarrinho;
        } else {
          toast.error("Produto não encontrado em 'dados'");
        }
      }
    } else {
      toast.error("Quantidade inválida");
    }
    
    console.log(carrinho);
  }
  


  function finalizarvenda() {
    const confirmacao = confirm("Deseja completar a venda?");

    if (!confirmacao) {
      toast.error("Venda cancelada");
      return;
    }

    if (carrinho.length === 0) {
      toast.error("Carrinho vazio");
      return;
    }

    const notify = () =>
      (toastId.current = toast("Enviando vendas...", {
        autoClose: false,
        type: toast.TYPE.INFO,
      }));

    const update = () =>
      toast.update(toastId.current, {
        render: "Venda finalizada com sucesso!",
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
      });

      const updatebad = () =>
      toast.update(toastId.current, {
        render: "Ocorreu um erro com a venda!",
        type: toast.TYPE.ERROR,
        autoClose: 5000,
      });

    notify();

    const promises = [];

    carrinho.forEach((item) => {
      const promise = axios.post(
        `http://${ip}/cadvenda`,
        {
          produto: item.produto,
          quantidade: item.quantidade,
          lucrototal: item.lucrototal,
          precototal: item.precototal,
        },
        options
      );

      promises.push(promise);
    });

    Promise.all(promises)
      .then((responses) => {
        update();
        console.log("Todas as vendas foram enviadas com sucesso");
        setAtt(!att);
        setCarrinho([]);
      })
      .catch((error) => {
        updatebad();
        console.log("Ocorreu um erro ao enviar as vendas:", error);
      });
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const columnscarrinho = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nome", headerName: "Produto", width: 130 },
    { field: "quantidade", headerName: "Quantidade", width: 130 },
    { field: "precototal", headerName: "Preço Total", width: 130 },
    { field: "lucrototal", headerName: "Lucro Total", width: 130 },
  ];

  const ultimascolunas = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nome_produto", headerName: "Produto", width: 130 },
    { field: "quantidade", headerName: "Quantidade", width: 130 },
    { field: "precototal", headerName: "Preço Total", width: 130 },
    { field: "lucrototal", headerName: "Lucro Total", width: 130 },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nome", headerName: "Produto", width: 130 },
    {
      field: "quantidade",
      headerName: "Estoque",
      type: "number",
      width: 90,
    },
    {
      field: "precocompra",
      headerName: "Preço de Compra",
      type: "number",
      width: 130,
    },
    {
      field: "precovenda",
      headerName: "Preço de Venda",
      type: "number",
      width: 130,
    },
    {
      field: "nomecategoria",
      headerName: "Categoria",
      type: "string",
      width: 130,
    },
    {
      field: "adicionarCarrinho",
      headerName: "",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            width="50%"
            size="small"
            onClick={() => adicionarAoCarrinho(params.row)}
            className="btn-adicionar-carrinho"
          >
            <FontAwesomeIcon icon={faCartPlus} size="2xl" />
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    axios
      .get(`http://${ip}/listarprodutos/`, options)
      .then((response) => {
        setDados(response.data);
      })
      .catch((error) => {
        setDados([]);
      });
    axios
      .get(`http://${ip}/listarcategorias/`, options)
      .then((response) => {
        setCategoria(response.data);
      })
      .catch((error) => {
        setCategoria([]);
      });
    axios
      .get(`http://${ip}/listarvendas/`, options)
      .then((response) => {
        setUltimas(response.data);
      })
      .catch((error) => {
        setUltimas([]);
      });
  }, [carrinholimpo, att]);

  const categoriaMap = {};
  categorias.forEach((categoria) => {
    categoriaMap[categoria.id] = categoria.categoria;
  });

  const produtosComNomeCategoria = dados.map((produto) => {
    return {
      ...produto,
      nomecategoria: categoriaMap[produto.categoria],
    };
  });
  return (
    <React.Fragment>
      <ToastContainer />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              Produtos
            </Typography>
            <DataGrid
              rows={produtosComNomeCategoria}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              Carrinho
            </Typography>
            <DataGrid
              rows={carrinho}
              columns={columnscarrinho}
              getRowId={(row) => row.produto}
            />
            <Button onClick={finalizarvenda} size="medium">
              Finalizar Venda
            </Button>
            <Button onClick={limparcarrinho} size="medium">
              Limpar Carrinho
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              Últimas Vendas
            </Typography>
            <DataGrid
              rows={ultimas}
              columns={ultimascolunas}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={(row) => row.id}
            />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
