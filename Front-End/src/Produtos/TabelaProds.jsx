import React from "react";
import Editar from "./Editar";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import ip from "../assets/funcs/ip";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Ocultarprod from "./Ocultarproduto";

export default function TabelaProd(props) {
  const [produtos, setProdutos] = React.useState([]);
  const [categorias, setCategoria] = React.useState([]);
  const [editado, setEditado] = React.useState(false);
  const [envio, setEnvio] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [categoriaedit, setCategoriaEdit] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false)

  const config = {
    headers: { Authorization: `${Cookies.get("token")}` },
  };

  function editarcategoria() {
    if (categoriaedit !== "") {
      axios
        .put(
          `http://${ip}/editarcategoria/${envio.categoria}`,
          {
            nome: categoriaedit,
          },
          config
        )
        .then((response) => {
          setEditado(!editado);
        });
    }
  }

  async function getProdutos() {
    try {
      const response = await axios.get(`http://${ip}/listarprodutos/`, config);
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar os dados de produtos:", error);
    }
  }

  async function getCategorias() {
    try {
      const response = await axios.get(
        `http://${ip}/listarcategorias/`,
        config
      );
      setCategoria(response.data);
    } catch (error) {
      console.error("Erro ao buscar os dados de categorias:", error);
    }
  }

  const handleCategoriaChange = (e) => {
    setEnvio({ ...envio, categoria: e.target.value });
  };

  const categoriaMap = {};
  categorias.forEach((categoria) => {
    categoriaMap[categoria.id] = categoria.categoria;
  });

  const produtosComNomeCategoria = produtos.map((produto) => {
    return {
      ...produto,
      nomecategoria: categoriaMap[produto.categoria],
    };
  });

  React.useEffect(() => {
    getProdutos();
    getCategorias();
  }, [editado, props.att]);

  return (
    <>
      <DataGrid
        rows={produtosComNomeCategoria}
        columns={[
          { field: "id", headerName: "ID", width: 70 },
          { field: "nome", headerName: "Nome", width: 120 },
          { field: "precocompra", headerName: "Preço de Compra", width: 120 },
          { field: "precovenda", headerName: "Preço de Venda", width: 120 },
          { field: "quantidade", headerName: "Quantidade", width: 70 },
          { field: "nomecategoria", headerName: "Categoria", width: 200 },
          {
            field: "editarProduto",
            headerName: "",
            width: 150,
            renderCell: (params) => {
              return (
                <Editar
                  id={params.row.id}
                  nome={params.row.nome}
                  quantidade={params.row.quantidade}
                  precocompra={params.row.precocompra}
                  precovenda={params.row.precovenda}
                  editado={editado}
                  setEditado={setEditado}
                />
              );
            },
          },
          {
            field: "excluirProduto",
            headerName: "",
            width: 150,
            renderCell: (params) => {
              return (
                <div>
                    <Button
                  width="50%"
                  size="small"
                  onClick={() => {
                    
                    const resdelete = axios
                      .delete(
                        `http://${ip}/deletarproduto/${params.row.id}`,
                        config
                      )
                      .then((response) => {
                        getProdutos();
                      })
                      .catch((error) => {
                        if (error.response.status === 406) {
                          setModalOpen(true);
                        }
                      });
                  }}
                  className="btn-adicionar-carrinho"
                  alt="Excluir produto"
                >
                  <FontAwesomeIcon icon={faTrash} size="xl" />
                </Button>
                <Ocultarprod id={params.row.id} open={modalOpen} setModalOpen={setModalOpen} />
                </div>
              );
            },
          },
        ]}
      ></DataGrid>
    </>
  );
}
