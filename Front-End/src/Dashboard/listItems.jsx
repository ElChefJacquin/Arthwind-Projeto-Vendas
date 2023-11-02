import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from '@mui/icons-material/Info';
import AssignmentIcon from "@mui/icons-material/Assignment";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import { Logoff } from './../assets/funcs/logoff';
import ExitToApp from "@mui/icons-material/ExitToApp";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Página Inicial"/>
    </ListItemButton>
    <ListItemButton component={Link} to="/vendas">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Vendas"/>
    </ListItemButton>
    <ListItemButton component={Link} to="/produtos">
      <ListItemIcon>
        <Inventory2Icon />
      </ListItemIcon>
        <ListItemText primary="Produtos" />
    </ListItemButton>
    <ListItemButton component={Link} to="/categorias">
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Categorias" />
    </ListItemButton>
    <Divider sx={{ my: 1 }} />
    <ListItemButton component={Link} to="/sobre">
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="Sobre" />
    </ListItemButton>
    <ListItemButton onClick={Logoff}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItemButton>
    {/* <ListItemButton component={Link} to="/relatorios">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Relatórios" />
    </ListItemButton> */}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Relatórios Rápidos
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Mês atual" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Últimos 3 meses" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Último ano" />
    </ListItemButton>
  </React.Fragment>
);
