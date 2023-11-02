import * as React from "react";
import Cookies from 'js-cookie';
import ip from "../assets/funcs/ip";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

export default function TableCategoria({att, setAtt}) {
  const config = {
    headers: {Authorization: `${Cookies.get("token")}`},
}
  const [categorias, setCategoria] = React.useState([]);

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

  React.useEffect(() => {
    getCategorias();
  }, [att]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={categorias}
        columns={[
          { field: "id", headerName: "ID", width: 100 },
          { field: "categoria", headerName: "Categoria", width: 600 },
        ]}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}


