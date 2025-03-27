import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit_ruta = () => {
    const { id_ruta } = useParams();
    const navigate = useNavigate(); 
    const [ruta, setRuta] = useState({
        id_ruta: "",
        id_conductor: "",
        id_pasajero: "",
        lat_inicio: "",
        lon_inicio: "",
        lat_final: "",
        lon_final: "",
        f_inicio: "",
        f_final: "",
        direccion: "",
    });

    useEffect(() => {
        axios.get(`http://18.118.253.191/api/rtua/${id_ruta}`)
            .then(response => setRuta(response.data))
            .catch(error => console.error(error));
    }, [id_ruta]);

    const handleChange = (e) => {
        setRuta({ ...ruta, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://18.118.253.191/api/ruta/${id_ruta}`, ruta)
        .then(() => {
            alert("Ruta actualizado");
            navigate("/c_ruta"); 
        })
        .catch(error => console.error(error));
    };

    const handleRedirect = () => {
        navigate("/c_ruta"); 
    };

    return (
        <>
            <style>
                {`
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f8e8e8;
                    color: #5a1a1a;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }

                form {
                    background: #fff5f5;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    width: 300px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                input, select, button {
                    padding: 10px;
                    border: 1px solid #d47f7f;
                    border-radius: 5px;
                    font-size: 14px;
                }

                input:focus, select:focus {
                    outline: none;
                    border-color: #b53d3d;
                    box-shadow: 0 0 5px rgba(181, 61, 61, 0.5);
                }

                button {
                    background-color: #b53d3d;
                    color: white;
                    border: none;
                    cursor: pointer;
                    transition: 0.3s;
                }

                button:hover {
                    background-color: #921818;
                }
                `}
            </style>
            <form onSubmit={handleSubmit}>
                <h1>Editar Ruta</h1>
                <input type="text" name="id_ruta" placeholder="Ruta" value={ruta.id_ruta} onChange={handleChange} required />
                <input type="text" name="id_conductor" placeholder="Conductor" value={ruta.id_conductor} onChange={handleChange} required />
                <input type="text" name="id_pasajero" placeholder="Pasajero" value={ruta.id_pasajero} onChange={handleChange} required />
                <input type="text" name="lat_inicio" placeholder="Latitud Inicio" value={ruta.lat_inicio} onChange={handleChange} required />
                <input type="text" name="lon_inicio" placeholder="Longitud Inicio" value={ruta.lon_inicio} onChange={handleChange} required />
                <input type="text" name="lat_final" placeholder="Latitud Final" value={ruta.lat_final} onChange={handleChange} required />
                <input type="text" name="lon_final" placeholder="Longitud Final" value={ruta.lon_final} onChange={handleChange} required />
                <input type="text" name="f_inicio" placeholder="Fecha Incio" value={ruta.f_inicio} onChange={handleChange} required />
                <input type="text" name="f_final" placeholder="Fecha Final" value={ruta.f_final} onChange={handleChange} required />
                <input type="text" name="distancia" placeholder="Distancia" value={ruta.distancia} onChange={handleChange} required />
                <button type="submit">Actualizar ruta</button>
                <button type="button" onClick={handleRedirect}>Volver a rutas</button>
            </form>
        </>
    );
};

export default Edit_ruta;