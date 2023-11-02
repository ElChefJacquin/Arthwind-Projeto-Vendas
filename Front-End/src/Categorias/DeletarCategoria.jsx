import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Typography from '@mui/material/Typography';
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";
import ip from "../assets/funcs/ip";

export default function DeletarCategoria({att, setAtt}) {
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

    async function getCategorias() {
        try {
          const response = await axios.get(
            `http://${ip}/listarcategorias/`, config
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

    React.useEffect(() => {
        getCategorias();
        getProdutos();
    }, [att]);
  return (
    <>
      
        <Typography variant="h6" gutterBottom component="div">
        Deletar Categoria
      </Typography>
      <TextField
            id="outlined-select-currency"
            select
            label="Categoria"
            value={envio.categoria}
            onChange={handleCategoriaChange}
            helperText="Selecione a categoria"
            style={{ width: "80%", marginTop: "10px" }}
            >
            {categorias.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                {option.categoria}
                </MenuItem>
            ))}
            </TextField>
            <Button
            variant="contained"
            style={{ width: "50%", marginTop: "10px" }}
            onClick={() => {
                axios
                .delete(`http://${ip}/deletarcategoria/${envio.categoria}/`, config)
                .then((response) => {
                    getCategorias();
                    setAtt(!att);
                });
            }}
            >Deletar</Button>
    </>
  );
}
