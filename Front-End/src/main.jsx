import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from "./Dashboard/Dashboard.jsx"
import Layout from "./Skeletons/Layout.jsx"
import { Router, Routes } from 'react-router-dom'
import Rotas from './Rotas.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Rotas />
  </React.StrictMode>,
)
