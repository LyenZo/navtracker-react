import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as XLSX from 'xlsx'; 

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

    // Función para manejar la carga del archivo Excel
    const handleFileUpload = (e) => {
        const file = e.target.files[0]; // Obtiene el archivo cargado
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const wb = XLSX.read(binaryStr, { type: 'binary' });
            const ws = wb.Sheets[wb.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(ws); // Convierte la hoja en un array de objetos
            
            // Asegúrate de enviar los datos al servidor
            axios.post('http://localhost:3001/api/u_tipo/importar', data)
                .then(response => {
                    setTusuarios(response.data); // Actualiza el estado con los datos importados
                    alert('Datos importados correctamente!');
                })
                .catch(error => {
                    console.error('Error al importar datos:', error);
                    alert('Hubo un error al importar los datos');
                });
        };
        reader.readAsBinaryString(file);
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
            
            {/* Botón para cargar el archivo Excel */}
            <input 
                type="file" 
                accept=".xlsx, .xls" 
                onChange={handleFileUpload} 
            />

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
