import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import ip from "../assets/funcs/ip";
import axios from "axios";
import Cookies from "js-cookie";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

export default function Editar(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [nome, setNome] = React.useState("");
  const [quantidade, setQuantidade] = React.useState("");
  const [precoCompra, setPrecoCompra] = React.useState("");
  const [precoVenda, setPrecoVenda] = React.useState("");
  const [envio, setEnvio] = React.useState({});
  const [categorias, setCategoria] = React.useState([]);
  const [categoriaselec, setCategoriaSelec] = React.useState("");
  const config = {
    headers: { Authorization: `${Cookies.get("token")}` },
  };

  React.useEffect(() => {
    setNome(props.nome);
    setQuantidade(props.quantidade);
    setPrecoCompra(props.precocompra);
    setPrecoVenda(props.precovenda);
  }, [props.nome, props.quantidade, props.precocompra, props.precovenda]);

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
  const categoriaMap = {};
  categorias.forEach((categoria) => {
    categoriaMap[categoria.id] = categoria.categoria;
  });

  const handleCategoriaChange = (e) => {
    setEnvio({ ...envio, categoria: e.target.value });
  };

  function editar(row) {
    if (nome !== "") {
      envio.nome = nome;
    }
    if (quantidade !== "") {
      envio.quantidade = quantidade;
    }
    if (precoCompra !== "") {
      envio.precocompra = precoCompra;
    }
    if (precoVenda !== "") {
      envio.precovenda = precoVenda;
    }
    if (categoriaselec != [] || categoriaselec != "") {
      envio.categoria = categoriaselec;
    }
    if (
      nome == "" &&
      quantidade == "" &&
      precoCompra == "" &&
      precoVenda == "" &&
      categoriaselec == []
    ) {
      alert("Você não alterou nenhum campo");
    }
    if (nome != {}) {
      axios
        .put(`http://${ip}/editarproduto/` + props.id, envio, config)
        .then((response) => {
          props.editado ? props.setEditado(false) : props.setEditado(true);
          handleClose();
        })
        .catch((error) => {
          console.error("Erro ao editar o produto:", error);
        });
    }
  }

  React.useEffect(() => {
    getCategorias();
  }, []);

  return (
    <div>
      <Button onClick={handleOpen}><FontAwesomeIcon icon={faEdit} size="xl" /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h7"
            component="h2"
            style={{
              color: "black",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Faça abaixo as edições ao produto
          </Typography>
          <TextField
            id="outlined-basic"
            label="Nome"
            variant="outlined"
            style={{ width: "100%", marginBottom: "10px" }}
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Quantidade"
            variant="outlined"
            style={{ width: "100%", marginBottom: "10px" }}
            value={quantidade}
            onChange={(e) => {
              setQuantidade(e.target.value);
            }}
          />
          <FormControl fullWidth sx={{ m: 0, marginBottom: "10px" }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Preço de Compra
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
              label="Preço de Compra"
              value={precoCompra}
              onChange={(e) => {
                setPrecoCompra(e.target.value);
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 0 }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Preço de Venda
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
              label="Preço de Venda"
              value={precoVenda}
              onChange={(e) => {
                setPrecoVenda(e.target.value);
              }}
            />
          </FormControl>
          <TextField
            id="outlined-select-currency"
            select
            label="Categoria"
            value={envio.categoria}
            onChange={handleCategoriaChange}
            helperText="Selecione a categoria"
            style={{ width: "100%", marginTop: "10px" }}
          >
            {categorias.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.categoria}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            style={{ width: "100%", marginTop: "10px" }}
            onClick={() => {
              editar();
            }}
          >
            Salvar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
