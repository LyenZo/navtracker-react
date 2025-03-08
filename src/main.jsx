import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Home
import Home from "./pages/home";
//Create
import C_usuario from "./components/CRUDS/create/c_usuario";
import C_exel from "./components/CRUDS/create/c_exel";
//Read
import R_punto from "./components/CRUDS/read/r_punto";
import R_rastreo from "./components/CRUDS/read/r_rastreo";
import R_ruta from "./components/CRUDS/read/r_ruta";
import R_tipo from "./components/CRUDS/read/r_tipo";
import R_usuario from "./components/CRUDS/read/r_usuario";
import R_vehiculo from "./components/CRUDS/read/r_vehiculo";
//Edit
import Edit_punto from "./components/CRUDS/edit/edit_punto";
import Edit_rastreo from "./components/CRUDS/edit/edit_rastreo";
import Edit_ruta from "./components/CRUDS/edit/edit_ruta";
import Edit_tipo from "./components/CRUDS/edit/edit_tipo";
import Edit_usuario from "./components/CRUDS/edit/edit_usuario";
import Edit_vehiculo from "./components/CRUDS/edit/edit_vehiculo";
//Login
import Login from "./components/login";
//Password
import RecuperarPassword from "./components/password/recuperarPassword";
import RestablecerPassword from "./components/password/restablecerPassword";
import Perfil from "./components/perfil";
import Usuario from "./pages/crud_usuario";






ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* <!-- Home --> */}
      <Route path="/" element={<Home />} />
      {/* <!-- Create --> */}
      <Route path="/c_usuario" element={<C_usuario />} />
      <Route path="/c_exel" element={<C_exel />} />
      {/* <!-- Read --> */}
      <Route path="/r_punto" element={<R_punto />} />
      <Route path="/r_rastreo" element={<R_rastreo />} />
      <Route path="/r_ruta" element={<R_ruta />} />
      <Route path="/r_tipo" element={<R_tipo />} />
      <Route path="/r_usuario" element={<Usuario />} />
      <Route path="/r_vehiculo" element={<R_vehiculo />} />
      {/* <!-- Edit --> */}
      <Route path="/editar_punto/:id_punto" element={<Edit_punto />} />
      <Route path="/editar_rastreo/:id_rastreo" element={<Edit_rastreo />} />
      <Route path="/editar_ruta/:id_ruta" element={<Edit_ruta />} />
      <Route path="/editar_tipo/:id_tipo" element={<Edit_tipo />} />
      <Route path="/editar_usuario/:id_u" element={<Edit_usuario />} />
      <Route path="/editar_vehiculo/:id_vehiculo" element={<Edit_vehiculo />} />
      {/* <!-- Login --> */}
      <Route path="/login" element={<Login />} />
      {/* <!-- Password --> */}
      <Route path="/recuperar" element={<RecuperarPassword />} />
      <Route path="/restablecer-password/:token" element={<RestablecerPassword />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  </BrowserRouter>
)