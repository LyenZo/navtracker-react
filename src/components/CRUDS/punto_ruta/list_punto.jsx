import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const List_punto = () => {
    const [puntos, setPuntos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [pointsPerPage, setPointsPerPage] = useState(5); 

    useEffect(() => {
        axios.get("http://localhost:3001/api/punto_ruta/")
            .then(response => setPuntos(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id_punto) => {
        axios.delete(`http://localhost:3001/api/punto_ruta/${id_punto}`)
            .then(() => setPuntos(puntos.filter(punto => punto.id_punto !== id_punto)))
            .catch(error => console.error(error));
    };

    // Obtener los puntos actuales a mostrar según la página
    const indexOfLastPoint = currentPage * pointsPerPage;
    const indexOfFirstPoint = indexOfLastPoint - pointsPerPage;
    const currentPoints = puntos.slice(indexOfFirstPoint, indexOfLastPoint);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calcular el número total de páginas
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(puntos.length / pointsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <h2>Lista de Puntos</h2>
            <table>
                <thead>
                    <tr>
                        <th >ID</th>
                        <th >Nombre</th>
                        <th >Latitud</th>
                        <th >Longitud</th>
                        <th >Dirección</th>
                        <th >Editar</th>
                        <th >Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPoints.map(punto => (
                        <tr key={punto.id_punto} >
                            <td >{punto.id_punto}</td>
                            <td >{punto.nombre}</td>
                            <td >{punto.latitud}</td>
                            <td >{punto.longitud}</td>
                            <td >{punto.direccion}</td>
                            <td >
                                <Link to={`/edit_punto/${punto.id_punto}`}>
                                    <button >Editar</button>
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(punto.id_punto)}>Eliminar</button>
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

export default List_punto;
