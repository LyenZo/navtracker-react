import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";  // Opción si usas Bootstrap para algunos estilos
import "../../css/list_punto.css";

const List_punto = () => {
    const [puntos, setPuntos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [pointsPerPage, setPointsPerPage] = useState(5); 

    useEffect(() => {
        axios.get("http://18.118.253.191/api/punto_ruta/")
            .then(response => setPuntos(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id_punto) => {
        axios.delete(`http://18.118.253.191/api/punto_ruta/${id_punto}`)
            .then(() => setPuntos(puntos.filter(punto => punto.id_punto !== id_punto)))
            .catch(error => console.error(error));
    };

    const indexOfLastPoint = currentPage * pointsPerPage;
    const indexOfFirstPoint = indexOfLastPoint - pointsPerPage;
    const currentPoints = puntos.slice(indexOfFirstPoint, indexOfLastPoint);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(puntos.length / pointsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container custom-container">
            <h2 className="text-center">Lista de Puntos</h2>

            <table className="table table-striped table-bordered custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Latitud</th>
                        <th>Longitud</th>
                        <th>Dirección</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPoints.map(punto => (
                        <tr key={punto.id_punto}>
                            <td>{punto.id_punto}</td>
                            <td>{punto.nombre}</td>
                            <td>{punto.latitud}</td>
                            <td>{punto.longitud}</td>
                            <td>{punto.direccion}</td>
                            <td>
                                <Link to={`/edit_punto/${punto.id_punto}`}>
                                    <button className="btn btn-warning btn-sm">Editar</button>
                                </Link>
                            </td>
                            <td>
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => handleDelete(punto.id_punto)}
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

export default List_punto;
