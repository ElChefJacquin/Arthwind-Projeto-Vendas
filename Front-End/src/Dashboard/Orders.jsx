import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import Title from '../Skeletons/Title';
import axios from 'axios';
import Cookies from 'js-cookie';
import ip from "../assets/funcs/ip";

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const config = {
    headers: {Authorization: `${Cookies.get("token")}`},
}
  const [ultimas, setUltimas] = React.useState([]);
  async function listarultimas() {
    axios
      .get(`http://${ip}/listarvendas/`, config)
      .then((response) => {
        setUltimas(response.data);
      })
      .catch((error) => {
        setUltimas([]);
      });
  }

  React.useEffect(() => {
    listarultimas();
  }
  , []);
  return (
    <React.Fragment>
      <Box sx={{ overflowX: 'auto' }}>
      <Title>Vendas Recentes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Produto</TableCell>
            <TableCell>Preço Total</TableCell>
            <TableCell>Lucro Total</TableCell>
            <TableCell align="right">Quantidade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ultimas.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nome_produto}</TableCell>
              <TableCell>{row.precototal}</TableCell>
              <TableCell>{row.lucrototal}</TableCell>
              <TableCell align="right">{`${row.quantidade}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/vendas" onClick={preventDefault} sx={{ mt: 3 }}>
        Ver todas as vendas
      </Link>
      </Box>
    </React.Fragment>
  );
}
