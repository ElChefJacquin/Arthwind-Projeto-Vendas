import React from "react";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "js-cookie";
import ip from "../assets/funcs/ip";

export default function CriarProd({att, setAtt}) {
    const config = {
        headers: {Authorization: `${Cookies.get("token")}`},
    }
    const [nome, setNome] = React.useState("");
    const [criado, setCriado] = React.useState(false);
    const [quantidade, setQuantidade] = React.useState("");
    const [categoria, setCategoria] = React.useState([]);
    const [categorias, setCategorias] = React.useState([]);
    const [envio, setEnvio] = React.useState({});
    const [produtos, setProdutos] = React.useState([]);
    const [precoCompra, setPrecoCompra] = React.useState("");
    const [precoVenda, setPrecoVenda] = React.useState("");

    async function getProdutos() {
        try {
            const response = await axios.get(
                `http://${ip}/listarprodutos/`
            , config);
            
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

    const produtosComNomeCategoria = produtos.map((produto) => {
        return {
            ...produto,
            nomecategoria: categoriaMap[produto.categoria],
        };
    });

    React.useEffect(() => {
        getCategorias();
        getProdutos();
    }, []);

    React.useEffect(() => {
        setCategorias(categoria);
    }, [categoria, criado]);

    return (
        <React.Fragment>
            <Box
                component="form"
                sx={{
                    "& > :not(style)": {m: 1, width: "25ch"},
                }}
                noValidate
                autoComplete="off"
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                textAlign={"center"}
            >
                <h1>Criar Produto</h1>

                <TextField
                    id="outlined-basic"
                    label="Nome"
                    variant="outlined"
                    style={{marginBottom: "10px", width: "80%"}}
                    value={nome}
                    onChange={(e) => {
                        setNome(e.target.value);
                    }}
                />
                <TextField
                    id="outlined-basic"
                    label="Quantidade"
                    variant="outlined"
                    style={{marginBottom: "10px", width: "80%"}}
                    value={quantidade}
                    onChange={(e) => {
                        setQuantidade(e.target.value);
                    }}
                />
                <TextField
                    id="outlined-basic"
                    label="Preço de compra"
                    variant="outlined"
                    style={{marginBottom: "10px", width: "80%"}}
                    value={precoCompra}
                    onChange={(e) => {
                        setPrecoCompra(e.target.value);
                    }}
                />
                <TextField
                    id="outlined-basic"
                    label="Preço de venda"
                    variant="outlined"
                    style={{marginBottom: "10px", width: "80%"}}
                    value={precoVenda}
                    onChange={(e) => {
                        setPrecoVenda(e.target.value);
                    }}
                />
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Categoria"
                    value={envio.categoria}
                    onChange={handleCategoriaChange}
                    helperText="Selecione a categoria"
                    style={{width: "80%", marginTop: "10px"}}
                >
                    {categorias.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.categoria}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    variant="contained"
                    style={{width: "30%", marginTop: "10px"}}
                    onClick={() => {
                        axios
                            .post(`http://${ip}/cadprodutos`, {
                                nome: nome,
                                quantidade: quantidade,
                                precocompra: precoCompra,
                                precovenda: precoVenda,
                                categoria: envio.categoria,
                            }, config)
                            .then((response) => {
                                console.log("Produto cadastrado com sucesso!");
                                setAtt(!att);
                                setNome("");
                                setQuantidade("");
                                setPrecoCompra("");
                                setPrecoVenda("");
                                setCriado(!criado);
                            });
                    }}
                >
                    Cadastrar
                </Button>
            </Box>
        </React.Fragment>
    );
}
