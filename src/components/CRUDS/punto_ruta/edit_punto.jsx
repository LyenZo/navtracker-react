import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit_punto = () => {
    const { id_punto } = useParams();
    const navigate = useNavigate(); 
    const [punto, setPunto] = useState({
        nombre: "",
        latitud: "",
        longitud: "",
        direccion: ""
        
    });

    useEffect(() => {
        axios.get(`http://18.118.253.191/api/punto_ruta/${id_punto}`)
            .then(response => setPunto(response.data))
            .catch(error => console.error(error));
    }, [id_punto]);

    const handleChange = (e) => {
        setPunto({ ...punto, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://18.118.253.191/api/punto_ruta/${id_punto}`, punto)
        .then(() => {
            alert("Punto ruta actualizado");
            navigate("/c_punto"); 
        })
        .catch(error => console.error(error));
    };

    const handleRedirect = () => {
        navigate("/crud_punto"); 
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Editar Punto</h1>
                <input type="text" name="nombre" placeholder="Nombre" value={punto.nombre} onChange={handleChange} required />
                <input type="text" name="latitud" placeholder="Latitud" value={punto.latitud} onChange={handleChange} required />
                <input type="text" name="longitud" placeholder="Longitud" value={punto.longitud} onChange={handleChange} required />
                <input type="text" name="direccion" placeholder="Dirección" value={punto.direccion} onChange={handleChange} required />
                <button type="submit">Actualizar punto de ruta</button>
                <button type="button" onClick={handleRedirect}>Volver a Punto de ruta</button>
            </form>
        </>
    );
};

export default Edit_punto;