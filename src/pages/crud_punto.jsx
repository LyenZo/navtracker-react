import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Create_punto from "../components/CRUDS/punto_ruta/create_punto";
import List_punto from "../components/CRUDS/punto_ruta/list_punto";
import Excel_punto from "../components/CRUDS/punto_ruta/excel_punto";

const Crud_punto = () => {
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
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    if (!usuario) {
        return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div><p>Cargando perfil...</p></div>;
    }

    
    if (usuario.id_tipo !== 3) {
        navigate("/");
        return null; 
    }

    return (
        <div>
            <Create_punto />
            <List_punto />
            <Excel_punto />
        </div>
    );
};

export default Crud_punto;
