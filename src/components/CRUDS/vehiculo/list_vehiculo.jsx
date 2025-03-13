import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const List_vehiculo = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [vehiculosPerPage, setVehiculosPerPage] = useState(5); 

    useEffect(() => {
        axios.get("http://localhost:3001/api/vehiculo/")
            .then(response => setVehiculos(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id_vehiculo) => {
        axios.delete(`http://localhost:3001/api/vehiculo/${id_vehiculo}`)
            .then(() => setVehiculos(vehiculos.filter(vehiculo => vehiculo.id_vehiculo !== id_vehiculo)))
            .catch(error => console.error(error));
    };

    const indexOfLastVehiculo = currentPage * vehiculosPerPage;
    const indexOfFirstVehiculo = indexOfLastVehiculo - vehiculosPerPage;
    const currentVehiculos = vehiculos.slice(indexOfFirstVehiculo, indexOfLastVehiculo);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(vehiculos.length / vehiculosPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <h2>Lista de Vehículos</h2>
            <table>
                <thead>
                    <tr>
                        <th >ID</th>
                        <th >Vehículo</th>
                        <th >Editar</th>
                        <th >Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentVehiculos.map(vehiculo => (
                        <tr key={vehiculo.id_vehiculo} >
                            <td >{vehiculo.id_vehiculo}</td>
                            <td >{vehiculo.vehiculo}</td>
                            <td >
                                <Link to={`/edit_vehiculo/${vehiculo.id_vehiculo}`}>
                                    <button >Editar</button>
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(vehiculo.id_vehiculo)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación */}
            <div >
                <nav>
                    <ul >
                        {pageNumbers.map(number => (
                            <li key={number}>
                                <button 
                                    onClick={() => paginate(number)} 
                                    
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default List_vehiculo;
