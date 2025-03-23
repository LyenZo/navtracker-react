import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";  // Opción si usas Bootstrap para algunos estilos
import "../../css/list_rastreo.css";

const R_rastreo = () => {
    const [rastreos, setRastreos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rastreosPerPage, setRastreosPerPage] = useState(5);

    // Función para obtener los rastreos desde la API
    const fetchRastreos = () => {
        axios.get("http://localhost:3001/api/gps/")
            .then(response => setRastreos(response.data))
            .catch(error => console.error(error));
    };

    // Llamamos a la API cuando el componente se monta
    useEffect(() => {
        fetchRastreos();  // Obtiene los rastreos iniciales
        
        // Configuración para actualizar los rastreos cada 5 segundos
        const interval = setInterval(fetchRastreos, 5000);  // Actualiza cada 5 segundos

        // Limpiamos el intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
    }, []);

    // Función para manejar la eliminación de un rastreo
    const handleDelete = (id_rastreo) => {
        axios.delete(`http://localhost:3001/api/gps/${id_rastreo}`)
            .then(() => setRastreos(rastreos.filter(rastreo => rastreo.id_rastreo !== id_rastreo)))
            .catch(error => console.error(error));
    };

    // Paginación
    const indexOfLastRastreo = currentPage * rastreosPerPage;
    const indexOfFirstRastreo = indexOfLastRastreo - rastreosPerPage;
    const currentRastreos = rastreos.slice(indexOfFirstRastreo, indexOfLastRastreo);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(rastreos.length / rastreosPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container custom-container">
            <h2 className="text-center">Lista de Rastreos</h2>

            <table className="table table-striped table-bordered custom-table">
                <thead>
                    <tr>
                        <th>ID Rastreo</th>
                        <th>Latitud</th>
                        <th>Longitud</th>
                        <th>Altitud</th>
                        <th>Velocidad</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRastreos.map(rastreo => (
                        <tr key={rastreo.id_gps}>
                            <td>{rastreo.id_gps}</td>
                            <td>{rastreo.latitud}</td>
                            <td>{rastreo.longitud}</td>
                            <td>{rastreo.altitud}</td>
                            <td>{rastreo.velocidad}</td>
                            <td>
                                <Link to={`/edit_rastreo/${rastreo.id_rastreo}`}>
                                    <button className="btn btn-warning btn-sm">Editar</button>
                                </Link>
                            </td>
                            <td>
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => handleDelete(rastreo.id_rastreo)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="pagination-container">
                <nav>
                    <ul className="pagination justify-content-center">
                        {pageNumbers.map(number => (
                            <li key={number} className="page-item">
                                <button 
                                    className="page-link" 
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

export default R_rastreo;
