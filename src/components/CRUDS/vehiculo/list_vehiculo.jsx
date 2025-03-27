import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const R_vehiculos = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [vehiculosPerPage, setVehiculosPerPage] = useState(5); // Vehículos por página

    useEffect(() => {
        axios.get("http://18.118.253.191/api/vehiculo/")
            .then(response => setVehiculos(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id_vehiculo) => {
        axios.delete(`http://18.118.253.191/api/vehiculo/${id_vehiculo}`)
            .then(() => setVehiculos(vehiculos.filter(vehiculo => vehiculo.id_vehiculo !== id_vehiculo)))
            .catch(error => console.error(error));
    };

    // Obtener los vehículos actuales a mostrar según la página
    const indexOfLastVehiculo = currentPage * vehiculosPerPage;
    const indexOfFirstVehiculo = indexOfLastVehiculo - vehiculosPerPage;
    const currentVehiculos = vehiculos.slice(indexOfFirstVehiculo, indexOfLastVehiculo);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calcular el número total de páginas
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(vehiculos.length / vehiculosPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div style={{ padding: "20px", backgroundColor: "#fff", border: "1px solid #f08080", borderRadius: "8px" }}>
            <h2 style={{ color: "#b22222", marginBottom: "15px" }}>Lista de Vehículos</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #f08080" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f08080", color: "white" }}>
                        <th style={{ border: "1px solid #f08080", padding: "8px" }}>ID</th>
                        <th style={{ border: "1px solid #f08080", padding: "8px" }}>Vehículo</th>
                        <th style={{ border: "1px solid #f08080", padding: "8px" }}>Editar</th>
                        <th style={{ border: "1px solid #f08080", padding: "8px" }}>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentVehiculos.map(vehiculo => (
                        <tr key={vehiculo.id_vehiculo} style={{ backgroundColor: "#fff", borderBottom: "1px solid #f08080" }}>
                            <td style={{ padding: "8px", textAlign: "center" }}>{vehiculo.id_vehiculo}</td>
                            <td style={{ padding: "8px", textAlign: "center" }}>{vehiculo.vehiculo}</td>
                            <td style={{ padding: "8px", textAlign: "center" }}>
                                <Link to={`/editar_vehiculo/${vehiculo.id_vehiculo}`}>
                                    <button style={{ backgroundColor: "#b22222", color: "white", padding: "5px 10px", border: "none", borderRadius: "4px", marginRight: "5px", cursor: "pointer" }}>Editar</button>
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(vehiculo.id_vehiculo)} style={{ backgroundColor: "#f08080", color: "white", padding: "5px 10px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Eliminar</button>
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

export default R_vehiculos;
