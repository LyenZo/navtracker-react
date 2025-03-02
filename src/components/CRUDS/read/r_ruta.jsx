import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const R_ruta = () => {
    const [rutas, setRutas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [rutasPerPage, setRutasPerPage] = useState(5); // Cantidad de rutas por página

    useEffect(() => {
        axios.get("http://localhost:3001/api/ruta/")
            .then(response => setRutas(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id_ruta) => {
        axios.delete(`http://localhost:3001/api/ruta/${id_ruta}`)
            .then(() => setRutas(rutas.filter(ruta => ruta.id_ruta !== id_ruta)))
            .catch(error => console.error(error));
    };

    // Obtener las rutas actuales a mostrar según la página
    const indexOfLastRuta = currentPage * rutasPerPage;
    const indexOfFirstRuta = indexOfLastRuta - rutasPerPage;
    const currentRutas = rutas.slice(indexOfFirstRuta, indexOfLastRuta);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calcular el número total de páginas
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(rutas.length / rutasPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div style={{ padding: "20px", backgroundColor: "#fff", border: "1px solid #f08080", borderRadius: "8px" }}>
            <h2 style={{ color: "#b22222", marginBottom: "15px" }}>Lista de Rutas</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #f08080" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f08080", color: "white" }}>
                        <th style={{ border: "1px solid #f08080", padding: "8px" }}>ID Ruta</th>
                        <th style={{ border: "1px solid #f08080", padding: "8px" }}>ID Conductor</th>
                        <th style={{ border: "1px solid #f08080", padding: "8px" }}>ID Pasajero</th>
                        <th style={{ border: "1px solid #f08080", padding: "8px" }}>Latitud Inicio</th>
                        <th style={{ border: "1px solid #f08080", padding: "8px" }}>Longitud Inicio</th>
                        <th style={{ border: "1px solid #f08080", padding: "8px" }}>Latitud Final</th>
                        <th style={{ border: "1px solid #f08080", padding: "8px" }}>Longitud Final</th>
                        <th style={{ border: "1px solid #f08080", padding: "8px" }}>Fecha Inicio</th>
                        <th style={{ border: "1px solid #f08080", padding: "8px" }}>Fecha Final</th>
                        <th style={{ border: "1px solid #f08080", padding: "8px" }}>Distancia</th>
                        <th style={{ border: "1px solid #f08080", padding: "8px" }}>Editar</th>
                        <th style={{ border: "1px solid #f08080", padding: "8px" }}>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRutas.map(ruta => (
                        <tr key={ruta.id_ruta} style={{ backgroundColor: "#fff", borderBottom: "1px solid #f08080" }}>
                            <td style={{ padding: "8px", textAlign: "center" }}>{ruta.id_ruta}</td>
                            <td style={{ padding: "8px", textAlign: "center" }}>{ruta.id_conductor}</td>
                            <td style={{ padding: "8px", textAlign: "center" }}>{ruta.id_pasajero}</td>
                            <td style={{ padding: "8px", textAlign: "center" }}>{ruta.lat_inicio}</td>
                            <td style={{ padding: "8px", textAlign: "center" }}>{ruta.lon_inicio}</td>
                            <td style={{ padding: "8px", textAlign: "center" }}>{ruta.lat_final}</td>
                            <td style={{ padding: "8px", textAlign: "center" }}>{ruta.lon_final}</td>
                            <td style={{ padding: "8px", textAlign: "center" }}>{ruta.f_inicio}</td>
                            <td style={{ padding: "8px", textAlign: "center" }}>{ruta.f_final}</td>
                            <td style={{ padding: "8px", textAlign: "center" }}>{ruta.distancia}</td>
                            <td style={{ padding: "8px", textAlign: "center" }}>
                                <Link to={`/editar_ruta/${ruta.id_ruta}`}>
                                    <button style={{ backgroundColor: "#b22222", color: "white", padding: "5px 10px", border: "none", borderRadius: "4px", marginRight: "5px", cursor: "pointer" }}>Editar</button>
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(ruta.id_ruta)} style={{ backgroundColor: "#f08080", color: "white", padding: "5px 10px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación */}
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                <nav>
                    <ul style={{ listStyle: "none", display: "flex", gap: "10px" }}>
                        {pageNumbers.map(number => (
                            <li key={number}>
                                <button 
                                    onClick={() => paginate(number)} 
                                    style={{
                                        backgroundColor: currentPage === number ? "#b22222" : "#f08080", 
                                        color: "white", 
                                        padding: "8px 16px", 
                                        border: "none", 
                                        borderRadius: "4px", 
                                        cursor: "pointer"
                                    }}
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
