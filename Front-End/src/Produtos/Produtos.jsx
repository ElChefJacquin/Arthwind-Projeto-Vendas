import React from "react";
import Layout from "../Skeletons/Layout";
import CriarProd from "./Criarproduto";
import TabelaProd from "./TabelaProds.jsx";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";


export default function Produtos() {
  const [att, setAtt] = React.useState(false);
  return (
    <Layout titulo="Produtos">
      <Grid container rowSpacing={1}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <CriarProd att={att} setAtt={setAtt}/>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <TabelaProd att={att}/>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
