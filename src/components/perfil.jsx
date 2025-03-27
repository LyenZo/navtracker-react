import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/perfil.css"

const Menu_cruds = () => {
    return (
        <div className="d-flex">
            <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
                <h4>Administrador</h4>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/crud_punto">Puntos de Ruta</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/crud_rastreo">Rastreador</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/crud_ruta">Ruta</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/crud_tipo">Tipos de Usuario</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/crud_usuario">Usuarios</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/crud_vehiculo">Vehículos</Link>
                    </li>
                </ul>
            </div>
            <div className="container mt-5">
                <Perfil />
            </div>
        </div>
    );
};

const Perfil = () => {
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        const fetchUsuario = async () => {
            try {
                const response = await axios.get("http://18.118.253.191/api/perfil", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsuario(response.data);
            } catch (error) {
                setError("Hubo un problema al cargar el perfil.");
            }
        };

        fetchUsuario();
    }, [navigate]);

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    if (!usuario) {
        return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div><p>Cargando perfil...</p></div>;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Perfil de Usuario</h2>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><strong>Nombre:</strong> {usuario.nombre}</li>
                                <li className="list-group-item"><strong>Apellido Paterno:</strong> {usuario.ap_pat}</li>
                                <li className="list-group-item"><strong>Apellido Materno:</strong> {usuario.ap_mat}</li>
                                <li className="list-group-item"><strong>Número telefónico:</strong> {usuario.n_tel}</li>
                                <li className="list-group-item"><strong>Email:</strong> {usuario.email}</li>
                                <li className="list-group-item"><strong>Usuario:</strong> {usuario.id_tipo === 1 ? "Conductor" : usuario.id_tipo === 2 ? "Pasajero" : usuario.id_tipo === 3 ? "Administrador" : "Desconocido"}</li>
                            </ul>
                            <button 
                                className="btn btn-danger w-100 mt-3"
                                onClick={() => { localStorage.removeItem("token"); navigate("/"); }}
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu_cruds;