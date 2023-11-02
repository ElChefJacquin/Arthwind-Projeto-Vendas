import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import ip from "../assets/funcs/ip";

export default function AddCategoria({att, setAtt}) {
  const config = {
    headers: {Authorization: `${Cookies.get("token")}`},
}
  const [CategoriaEdit, setCategoriaEdit] = useState("");
  const [categorias, setCategoria] = React.useState([]);

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
  const categoriaMap = {};
  categorias.forEach((categoria) => {
    categoriaMap[categoria.id] = categoria.categoria;
  });

  React.useEffect(() => {
    getCategorias();
  }, [att]);
  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Adicionar Categoria
      </Typography>
      <TextField
        id="outlined-basic"
        label="Categoria"
        variant="outlined"
        style={{ marginBottom: "10px", width: "30%" }}
        value={CategoriaEdit}
        onChange={(e) => {
          setCategoriaEdit(e.target.value);
        }}
      />
      <Button
        variant="contained"
        style={{ width: "30%", marginTop: "10px" }}
        onClick={() => {
          axios
            .post(`http://${ip}/cadcategoria`, {
              nome: CategoriaEdit,
            }, config)
            .then((response) => {
              getCategorias();
              setAtt(!att);
            });
        }}
      >
        Cadastrar
      </Button>
    </>
  );
}
