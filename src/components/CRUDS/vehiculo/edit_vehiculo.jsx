import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit_vehiculo = () => {
    const { id_vehiculo } = useParams();
    const navigate = useNavigate(); 
    const [vehiculo, setVehiculo] = useState({
        vehiculo: "",
    });

    useEffect(() => {
        axios.get(`http://18.118.253.191/api/vehiculo/${id_vehiculo}`)
            .then(response => setVehiculo(response.data))
            .catch(error => console.error(error));
    }, [id_vehiculo]);

    const handleChange = (e) => {
        setVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://18.118.253.191/api/vehiculo/${id_vehiculo}`, vehiculo)
        .then(() => {
            alert("Vehiculo actualizado");
            navigate("/c_vehiculo"); 
        })
        .catch(error => console.error(error));
    };

    const handleRedirect = () => {
        navigate("/c_vehiculo"); 
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
                <h1>Editar Vehiculo</h1>
                <input type="text" name="vehiculo" placeholder="Vehiculo" value={vehiculo.vehiculo} onChange={handleChange} required />
                <button type="submit">Actualizar Vehiculo</button>
                <button type="button" onClick={handleRedirect}>Volver a vehiculos</button>
            </form>
        </>
    );
};

export default Edit_vehiculo;