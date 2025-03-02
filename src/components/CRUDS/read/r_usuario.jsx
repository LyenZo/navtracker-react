import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const R_usuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [usuariosPerPage, setUsuariosPerPage] = useState(5); 

    useEffect(() => {
        axios.get("http://localhost:3001/api/usuario/")
            .then(response => setUsuarios(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id_u) => {
        axios.delete(`http://localhost:3001/api/usuario/${id_u}`)
            .then(() => setUsuarios(usuarios.filter(usuario => usuario.id_u !== id_u)))
            .catch(error => console.error(error));
    };

    // Obtener los usuarios actuales a mostrar según la página
    const indexOfLastUsuario = currentPage * usuariosPerPage;
    const indexOfFirstUsuario = indexOfLastUsuario - usuariosPerPage;
    const currentUsuarios = usuarios.slice(indexOfFirstUsuario, indexOfLastUsuario);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calcular el número total de páginas
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(usuarios.length / usuariosPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <h2 >Lista de Usuarios</h2>
            <table >
                <thead>
                    <tr >
                        <th >ID</th>
                        <th >Nombre</th>
                        <th >Apellido Paterno</th>
                        <th >Usuario</th>
                        <th >Email</th>
                        <th >Tipo Usuario</th>
                        <th >Vehículo</th>
                        <th >Editar</th>
                        <th >Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsuarios.map(usuario => (
                        <tr key={usuario.id_u} >
                            <td >{usuario.id_u}</td>
                            <td >{usuario.nombre}</td>
                            <td >{usuario.ap_pat}</td>
                            <td >{usuario.ap_mat}</td>
                            <td >{usuario.email}</td>
                            <td >{usuario.id_tipo}</td>
                            <td >{usuario.id_vehiculo}</td>
                            <td >
                                <Link to={`/editar_usuario/${usuario.id_u}`}>
                                    <button >Editar</button>
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(usuario.id_u)}>Eliminar</button>
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

export default R_usuario;
