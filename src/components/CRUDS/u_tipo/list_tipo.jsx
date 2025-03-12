import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const R_tipo = () => {
    const [t_usuarios, setTusuarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [usuariosPerPage, setUsuariosPerPage] = useState(5); 

    useEffect(() => {
        axios.get("http://localhost:3001/api/u_tipo/")
            .then(response => setTusuarios(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id_tipo) => {
        axios.delete(`http://localhost:3001/api/u_tipo/${id_tipo}`)
            .then(() => setTusuarios(t_usuarios.filter(t_usuario => t_usuario.id_tipo !== id_tipo)))
            .catch(error => console.error(error));
    };

    
    // Obtener los tipos de usuario actuales a mostrar según la página
    const indexOfLastUsuario = currentPage * usuariosPerPage;
    const indexOfFirstUsuario = indexOfLastUsuario - usuariosPerPage;
    const currentUsuarios = t_usuarios.slice(indexOfFirstUsuario, indexOfLastUsuario);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calcular el número total de páginas
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(t_usuarios.length / usuariosPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div >
            <h2 >Lista de Tipos de Usuario</h2>
            <table >
                <thead>
                    <tr >
                        <th >ID Tipo</th>
                        <th >Tipo</th>
                        <th >Editar</th>
                        <th >Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsuarios.map(t_usuario => (
                        <tr key={t_usuario.id_tipo} >
                            <td >{t_usuario.id_tipo}</td>
                            <td >{t_usuario.tipo}</td>
                            <td >
                                <Link to={`/editar_t_usuario/${t_usuario.id_tipo}`}>
                                    <button >Editar</button>
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(t_usuario.id_tipo)} >Eliminar</button>
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

export default R_tipo;
