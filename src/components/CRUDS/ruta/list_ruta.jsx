import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";  // Opción si usas Bootstrap para algunos estilos
import "../../css/list_ruta.css"

const R_ruta = () => {
    const [rutas, setRutas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [rutasPerPage, setRutasPerPage] = useState(5); 

    useEffect(() => {
        axios.get("http://18.118.253.191/api/ruta/")
            .then(response => setRutas(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id_ruta) => {
        axios.delete(`http://18.118.253.191/api/ruta/${id_ruta}`)
            .then(() => setRutas(rutas.filter(ruta => ruta.id_ruta !== id_ruta)))
            .catch(error => console.error(error));
    };

    const indexOfLastRuta = currentPage * rutasPerPage;
    const indexOfFirstRuta = indexOfLastRuta - rutasPerPage;
    const currentRutas = rutas.slice(indexOfFirstRuta, indexOfLastRuta);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(rutas.length / rutasPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container custom-container">
            <h2 className="text-center">Lista de Rutas</h2>

            <table className="table table-striped table-bordered custom-table">
                <thead>
                    <tr>
                        <th>ID Ruta</th>
                        <th>ID Conductor</th>
                        <th>ID Pasajero</th>
                        <th>Latitud Inicio</th>
                        <th>Longitud Inicio</th>
                        <th>Latitud Final</th>
                        <th>Longitud Final</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Final</th>
                        <th>Distancia</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRutas.map(ruta => (
                        <tr key={ruta.id_ruta}>
                            <td>{ruta.id_ruta}</td>
                            <td>{ruta.id_conductor}</td>
                            <td>{ruta.id_pasajero}</td>
                            <td>{ruta.lat_inicio}</td>
                            <td>{ruta.lon_inicio}</td>
                            <td>{ruta.lat_final}</td>
                            <td>{ruta.lon_final}</td>
                            <td>{ruta.f_inicio}</td>
                            <td>{ruta.f_final}</td>
                            <td>{ruta.distancia}</td>
                            <td>
                                <Link to={`/editar_ruta/${ruta.id_ruta}`}>
                                    <button className="btn btn-warning btn-sm">Editar</button>
                                </Link>
                            </td>
                            <td>
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => handleDelete(ruta.id_ruta)}
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

export default R_ruta;
