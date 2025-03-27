import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Edit_usuario = () => {
    const { id_u } = useParams();
    const navigate = useNavigate(); 
    const [usuario, setUsuario] = useState({
        nombre: "",
        ap_pat: "",
        ap_mat: "",
        email: "",
        password: "",
        n_tel:"",
        id_tipo: "",
        id_vehiculo: "",
    });

    useEffect(() => {
        axios.get(`http://18.118.253.191/api/usuario/${id_u}`)
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
            navigate("/list_usuario"); 
        })
        .catch(error => console.error(error));
    };

    const handleRedirect = () => {
        navigate("/list_usuario"); 
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Editar Usuario</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="nombre" 
                        name="nombre" 
                        placeholder="Nombre" 
                        value={usuario.nombre} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="ap_pat" className="form-label">Apellido Paterno</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="ap_pat" 
                        name="ap_pat" 
                        placeholder="Apellido Paterno" 
                        value={usuario.ap_pat} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="ap_mat" className="form-label">Apellido Materno</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="ap_mat" 
                        name="ap_mat" 
                        placeholder="Apellido Materno" 
                        value={usuario.ap_mat} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="id_tipo" className="form-label">Tipo de Usuario</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="id_tipo" 
                        name="id_tipo" 
                        placeholder="Tipo de Usuario" 
                        value={usuario.id_tipo} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="id_vehiculo" className="form-label">Vehículo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="id_vehiculo" 
                        name="id_vehiculo" 
                        placeholder="Vehículo" 
                        value={usuario.id_vehiculo} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        placeholder="Email" 
                        value={usuario.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="n_tel" className="form-label">Número telefónico</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="n_tel" 
                        name="n_tel" 
                        placeholder="Número telefónico" 
                        value={usuario.n_tel} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Actualizar Usuario</button>
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={handleRedirect}
                    >
                        Volver a Usuarios
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit_usuario;
