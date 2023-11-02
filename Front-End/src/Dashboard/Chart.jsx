import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import Title from '../Skeletons/Title';
import axios from 'axios';
import Cookies from 'js-cookie';
import ip from "../assets/funcs/ip";

export default function Chart() {
  const config = {
    headers: { Authorization: `${Cookies.get("token")}` },
  };
  const usuario = 1;
  const [uData, setUData] = React.useState([]);
  const [xLabels, setXLabels] = React.useState([]);

  async function getLucros() {
    try {
      axios
        .get(`http://${ip}/listarvendasmes/`, config)
        .then((response) => {
          setUData(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados de lucros:", error);
        });
    } catch (error) {
      console.error("Erro ao buscar os dados de lucros:", error);
    }
  }

  React.useEffect(() => {
    getLucros();
  }, []);

  let options1 = { year: 'numeric', month: '2-digit', day: '2-digit' };

  const uDataFormatado = uData.map((item) => {
    const dataOriginal = new Date(item.data);
    const novaData = new Date(dataOriginal);
    novaData.setDate(dataOriginal.getDate() + 1);

    return {
      data: novaData.toLocaleDateString(),
      Lucro: item.lucrodiario
    };
  });

  const theme = useTheme();
  
  const maxLucro = Math.max(...uDataFormatado.map((item) => item.Lucro));
  const minLucro = Math.min(0, ...uDataFormatado.map((item) => item.Lucro));
  
  return (
    <React.Fragment>
      <Title>Últimos 30 dias</Title>
      <ResponsiveContainer>
        <LineChart
          data={uDataFormatado}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="data" stroke={theme.palette.text.secondary} style={theme.typography.body2} />
          <YAxis
            domain={[minLucro, maxLucro]} // Define o domínio personalizado do eixo Y
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Vendas (R$)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={true}
            type="monotone"
            dataKey="Lucro"
            stroke={theme.palette.primary.main}
            dot={true}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
