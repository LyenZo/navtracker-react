import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit_usuario = () => {
    const { id_u } = useParams();
    const navigate = useNavigate(); 
    const [usuario, setUsuario] = useState({
        nombre: "",
        ap_pat: "",
        ap_mat: "",
        email: "",
        password: "",
        id_tipo: "",
        id_vehiculo: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/api/usuario/${id_u}`)
            .then(response => setUsuario(response.data))
            .catch(error => console.error(error));
    }, [id_u]);

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/api/usuario/${id_u}`, usuario)
        .then(() => {
            alert("Usuario actualizado");
            navigate("/c_usuario"); 
        })
        .catch(error => console.error(error));
    };

    const handleRedirect = () => {
        navigate("/c_usuario"); 
    };

    return (
        
            <form onSubmit={handleSubmit}>
                <h1>Editar Usuario</h1>
                <input type="text" name="nombre" placeholder="Nombre" value={usuario.nombre} onChange={handleChange} required />
                <input type="text" name="ap_pat" placeholder="Apellido Paterno" value={usuario.ap_pat} onChange={handleChange} required />
                <input type="text" name="ap_mat" placeholder="Apellido Materno" value={usuario.ap_mat} onChange={handleChange} required />
                <input type="text" name="id_tipo" placeholder="Usuario" value={usuario.id_tipo} onChange={handleChange} required />
                <input type="text" name="id_vehiculo" placeholder="Vehiculo" value={usuario.id_vehiculo} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={usuario.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Contraseña" value={usuario.password} onChange={handleChange} required />
                <button type="submit">Actualizar usuario</button>
                <button type="button" onClick={handleRedirect}>Volver a usuarios</button>
            </form>
        
    );
};

export default Edit_usuario;