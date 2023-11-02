import React from "react";
import Grid from "@mui/material/Grid";
import TabelaVendas from "./TabelaVendas";
import Layout from "../Skeletons/Layout";
import Paper from "@mui/material/Paper";

export default function Vendas() {
  return (
    <Layout titulo="Vendas">
      <TabelaVendas />
    </Layout>
  );
}
