import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Edit_vehiculo = () => {
    const { id_vehiculo } = useParams();
    const navigate = useNavigate(); 
    const [vehiculo, setVehiculo] = useState({
        vehiculo:""
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/api/vehiculo/${id_vehiculo}`)
            .then(response => setVehiculo(response.data))
            .catch(error => console.error(error));
    }, [id_vehiculo]);

    const handleChange = (e) => {
        setVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/api/vehiculo/${id_vehiculo}`, vehiculo)
        .then(() => {
            alert("Vehiculo actualizado");
            navigate("/list_vehiculo"); 
        })
        .catch(error => console.error(error));
    };

    const handleRedirect = () => {
        navigate("/crud_vehiculo"); 
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Editar Vehiculo</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Vehiculo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="vehiculo" 
                        name="vehiculo" 
                        placeholder="Vehiculo" 
                        value={vehiculo.vehiculo} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Actualizar Vehiculo</button>
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

export default Edit_vehiculo;
