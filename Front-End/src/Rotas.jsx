import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./Dashboard/Dashboard";
import Produtos from "./Produtos/Produtos";
import Vendas from "./Vendas/Vendas";
import Categorias from "./Categorias/Categorias";
import SignIn from "./Logins/Login/SignIn";
import SignUp from "./Logins/Cadastro/SignUp";
import Forgot from "./Logins/Forgot/Forgot";
import Emailrecovery from './Logins/Forgot/Forgotemail';
import Sobre from "./Outros/Sobre";

export default function Rotas() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/esqueciasenha" element={<Forgot />} />
          <Route path="/recuperarsenha" element={<Emailrecovery />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/vendas" element={<Vendas />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
}
