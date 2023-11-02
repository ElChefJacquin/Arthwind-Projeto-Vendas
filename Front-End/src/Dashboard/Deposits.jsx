import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../Skeletons/Title';
import axios from "axios";
import Cookies from 'js-cookie';
import ip from "../assets/funcs/ip";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const config = {
    headers: {Authorization: `${Cookies.get("token")}`},
}
  const usuario = 1;
  const [ultimas, setUltimas] = React.useState(0);
  async function getLucros() {
    try {
      axios
      .get(`http://${ip}/listarvendasmes/`, config)
      .then((response) => {
        const data = response.data;
        let totalLucro = 0;
        data.forEach(element => {
          totalLucro += Number(element.lucrodiario);
          console.log(totalLucro)
        });
        setUltimas(totalLucro)
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados de lucros:", error);
      })

    } catch (error) {
      console.error("Erro ao buscar os dados de lucros:", error);
    }
  }
  React.useEffect(() => {
    getLucros();
  }, []);
  return (
    <React.Fragment>
      <Title>Vendas Recentes</Title>
      <Typography component="p" variant="h4">
        {ultimas.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Vendas nos últimos 30 dias
      </Typography>
    </React.Fragment>
  );
}
