import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit_usuario = () => {
    const { id_tipo } = useParams();
    const navigate = useNavigate(); 
    const [t_usuario, setTusuario] = useState({
        id_tipo: "",
        tipo: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/api/u_tipo/${id_tipo}`)
            .then(response => setTusuario(response.data))
            .catch(error => console.error(error));
    }, [id_tipo]);

    const handleChange = (e) => {
        setTusuario({ ...t_usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://18.118.253.191/api/u_tipo/${id_tipo}`, t_usuario)
        .then(() => {
            alert("Tipo de usuario actualizado");
            navigate("/crud_tipo"); // Redirige después de actualizar
        })
        .catch(error => console.error(error));
    };

    const handleRedirect = () => {
        navigate("/crud_tipo"); // Redirige a la lista de tipos
    };

    return (
        <>
            <style>
                {`
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f8e8e8;
                    color: #5a1a1a;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }

                form {
                    background: #fff5f5;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    width: 300px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                input, select, button {
                    padding: 10px;
                    border: 1px solid #d47f7f;
                    border-radius: 5px;
                    font-size: 14px;
                }

                input:focus, select:focus {
                    outline: none;
                    border-color: #b53d3d;
                    box-shadow: 0 0 5px rgba(181, 61, 61, 0.5);
                }

                button {
                    background-color: #b53d3d;
                    color: white;
                    border: none;
                    cursor: pointer;
                    transition: 0.3s;
                }

                button:hover {
                    background-color: #921818;
                }
                `}
            </style>
            <form onSubmit={handleSubmit}>
                <h1>Editar Tipo de usuario</h1>
                {/* Cambié este campo para que sea solo de visualización */}
                <input 
                    type="text" 
                    name="id_tipo" 
                    placeholder="ID tipo" 
                    value={t_usuario.id_tipo} 
                    onChange={handleChange} 
                    disabled 
                />
                <input 
                    type="text" 
                    name="tipo" 
                    placeholder="Tipo" 
                    value={t_usuario.tipo} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Actualizar usuario</button>
                <button type="button" onClick={handleRedirect}>Volver a tipos</button>
            </form>
        </>
    );
};

export default Edit_usuario;
