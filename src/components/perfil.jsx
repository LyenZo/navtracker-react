import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Ruta from "./ruta";
import Menu_cruds from "./CRUDS/menu_cruds";

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
                const response = await axios.get("http://localhost:3001/api/perfil", {
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
        return <p>{error}</p>;
    }

    if (!usuario) {
        return <p >Cargando perfil...</p>;
    }

    return (
        <div >
            <h2 >Perfil de Usuario</h2>
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Apellido Paterno:</strong> {usuario.ap_pat}</p>
            <p><strong>Apellido Materno:</strong> {usuario.ap_mat}</p>
            <p><strong>Número telefónico:</strong> {usuario.n_tel}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Usuario:</strong> {usuario.id_tipo === 1 ? "Conductor" : usuario.id_tipo === 2 ? "Pasajero" : usuario.id_tipo === 3 ? "Administrador" : "Desconocido"}</p>
            <button onClick={() => { localStorage.removeItem("token"); navigate("/"); }}
                >
                Cerrar Sesión
            </button>
            {usuario.id_tipo === 1 && <Ruta />}
            {usuario.id_tipo === 3 && <Menu_cruds />}
        </div>
    );
};

export default Perfil;
