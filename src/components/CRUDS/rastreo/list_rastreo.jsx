import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const R_rastreo = () => {
    const [rastreos, setRastreos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [rastreosPerPage, setRastreosPerPage] = useState(5); 

    useEffect(() => {
        axios.get("http://localhost:3001/api/rastreo/")
            .then(response => setRastreos(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id_rastreo) => {
        axios.delete(`http://localhost:3001/api/rastreo/${id_rastreo}`)
            .then(() => setRastreos(rastreos.filter(rastreo => rastreo.id_rastreo !== id_rastreo)))
            .catch(error => console.error(error));
    };

    // Obtener los rastreos actuales a mostrar según la página
    const indexOfLastRastreo = currentPage * rastreosPerPage;
    const indexOfFirstRastreo = indexOfLastRastreo - rastreosPerPage;
    const currentRastreos = rastreos.slice(indexOfFirstRastreo, indexOfLastRastreo);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calcular el número total de páginas
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(rastreos.length / rastreosPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div >
            <h2 >Lista de Rastreos</h2>
            <table >
                <thead>
                    <tr >
                        <th >ID Rastreo</th>
                        <th >ID Ruta</th>
                        <th >Latitud</th>
                        <th >Longitud</th>
                        <th >Distancia</th>
                        <th >Fecha</th>
                        <th >ID Punto</th>
                        <th >Editar</th>
                        <th >Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRastreos.map(rastreo => (
                        <tr key={rastreo.id_rastreo} >
                            <td >{rastreo.id_rastreo}</td>
                            <td >{rastreo.id_ruta}</td>
                            <td >{rastreo.latitud}</td>
                            <td >{rastreo.longitud}</td>
                            <td >{rastreo.distancia}</td>
                            <td >{rastreo.fecha}</td>
                            <td >{rastreo.id_punto}</td>
                            <td >
                                <Link to={`/edit_rastreo/${rastreo.id_rastreo}`}>
                                    <button >Editar</button>
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(rastreo.id_rastreo)} >Eliminar</button>
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

export default R_rastreo;
