import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Typography from '@mui/material/Typography';
import MenuItem from "@mui/material/MenuItem";
import Cookies from "js-cookie";
import ip from "../assets/funcs/ip";

export default function EditarCategoria({att, setAtt}) {
    const [categorias, setCategoria] = React.useState([]);
    const [categoriaedit, setCategoriaEdit] = React.useState("");
    const [envio, setEnvio] = React.useState({});
    const [produtos, setProdutos] = React.useState([]);
    const config = {
      headers: {Authorization: `${Cookies.get("token")}`},
  }

    async function getProdutos() {
        try {
          const response = await axios.get(
            `http://${ip}/listarprodutos/`, config
          );
          setProdutos(response.data);
        } catch (error) {
          console.error("Erro ao buscar os dados de produtos:", error);
        }
      }
      function editarcategoria() {
        if (categoriaedit !== "") {
          axios
            .put(`http://${ip}/editarcategoria/`, {
              id: envio.categoria,
              nome: categoriaedit,
            }, config)
            .then((response) => {
              getCategorias();
              getProdutos();
              setAtt(!att);
            });
        }
      }

    async function getCategorias() {
        try {
          const response = await axios.get(
            `http://${ip}/listarcategorias/`, config
          );
          setCategoria(response.data);
          setCategoriaEdit("");
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
        getCategorias();
        getProdutos();
    }, [att]);
  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Editar Categoria
      </Typography>
      <TextField
            id="outlined-select-currency"
            select
            label="Categoria"
            value={envio.categoria}
            onChange={handleCategoriaChange}
            helperText="Selecione a categoria"
            style={{ width: "60%", marginTop: "10px" }}
          >
            {categorias.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.categoria}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-basic"
            label="Novo Nome"
            variant="outlined"
            style={{ marginBottom: "10px", width: "60%" }}
            value={categoriaedit}
            onChange={(e) => {
              setCategoriaEdit(e.target.value);
            }}
          />
          <Button
            variant="contained"
            style={{ width: "50%", marginTop: "10px" }}
            onClick={editarcategoria}
          >Confirmar edição</Button>          
    </>
  );
}
