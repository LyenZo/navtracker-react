import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit_rastreo = () => {
    const { id_rastreo } = useParams();
    const navigate = useNavigate(); 
    const [rastreo, setRastreo] = useState({
        id_ruta:"",
        latitud:"",
        longitud:"",
        distancia:"",
        fecha:"",
        id_punto:""
    });

    useEffect(() => {
        axios.get(`http://18.118.253.191/api/rastreo/${id_rastreo}`)
            .then(response => setRastreo(response.data))
            .catch(error => console.error(error));
    }, [id_rastreo]);

    const handleChange = (e) => {
        setRastreo({ ...rastreo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://18.118.253.191/api/rastreo/${id_rastreo}`, rastreo)
        .then(() => {
            alert("Rastreo actualizado");
            navigate("/crud_rastreo"); 
        })
        .catch(error => console.error(error));
    };

    const handleRedirect = () => {
        navigate("/crud_rastreo"); 
    };

    return (
        
            <form onSubmit={handleSubmit}>
                <h1>Editar Rastreo</h1>
                <input type="text" name="id_ruta" placeholder="ID ruta" value={rastreo.nombre} onChange={handleChange} required />
                <input type="text" name="latitud" placeholder="Latitud" value={rastreo.ap_pat} onChange={handleChange} required />
                <input type="text" name="longitud" placeholder="Longitud" value={rastreo.ap_mat} onChange={handleChange} required />
                <input type="text" name="distancia" placeholder="Distancia" value={rastreo.id_tipo} onChange={handleChange} required />
                <input type="text" name="id_punto" placeholder="ID punto" value={rastreo.id_vehiculo} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={rastreo.email} onChange={handleChange} required />
                <button type="submit">Actualizar rastreo</button>
                <button type="button" onClick={handleRedirect}>Volver a rastreos</button>
            </form>
        
    );
};

export default Edit_rastreo;