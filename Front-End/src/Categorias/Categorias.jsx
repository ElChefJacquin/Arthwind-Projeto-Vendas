import Layout from "../Skeletons/Layout";
import * as React from "react";
import Grid from "@mui/material/Grid";
import AddCategoria from "./AdicionarCategoria";
import Paper from "@mui/material/Paper";
import EditarCategoria from "./EditarCategoria";
import DeletarCategoria from "./DeletarCategoria";
import TableCategoria from "./TableCategorias";


export default function Categorias() {
  const [att, setAtt] = React.useState(false);
  return (
    <Layout titulo="Categorias">
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid item xs={12} sm={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <TableCategoria att={att} setAtt={setAtt}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <AddCategoria att={att} setAtt={setAtt}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              p: 5,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <EditarCategoria att={att} setAtt={setAtt}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              p: 9.12,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <DeletarCategoria att={att} setAtt={setAtt}/>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
