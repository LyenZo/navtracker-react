import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

const C_usuario = () => {
    const [usuario, setUsuario] = useState({
        nombre: "",
        ap_pat: "",
        ap_mat: "",
        email: "",
        password: "",
        n_tel: "",
        id_tipo: "",
        id_vehiculo: ""
    });

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            [name]: value,
            ...(name === "id_tipo" && value === "2" || value === "3" ? { id_vehiculo: "1" } : {})
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/api/usuario/", usuario);
            alert("Usuario registrado correctamente");
            setUsuario({
                nombre: "",
                ap_pat: "",
                ap_mat: "",
                email: "",
                password: "",
                n_tel: "",
                id_tipo: "",
                id_vehiculo: ""
            });
        } catch (error) {
            console.error("Error al registrar usuario", error);
            alert("Error al registrar usuario");
        }
    };

    const handleNavigate = () => {
        navigate('/c_exel'); 
    };

    return (
        <div>
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="nombre" placeholder="Nombre" value={usuario.nombre} onChange={handleChange} required />
                    <input type="text" name="ap_pat" placeholder="Apellido Paterno" value={usuario.ap_pat} onChange={handleChange} required />
                    <input type="text" name="ap_mat" placeholder="Apellido Materno" value={usuario.ap_mat} onChange={handleChange} required />
                    <input type="tel" name="n_tel" placeholder="Teléfono" value={usuario.n_tel} onChange={handleChange} required />
                    <select name="id_tipo" value={usuario.id_tipo} onChange={handleChange} required>
                        <option value="">Tipo de usuario</option>
                        <option value="1">Conductor</option>
                        <option value="2">Pasajero</option>
                        <option value="3">Administrador</option>
                    </select>
                </div>
                <div>
                    {usuario.id_tipo === "1" && (
                        <select name="id_vehiculo" value={usuario.id_vehiculo} onChange={handleChange} required>
                            <option value="">Tipo de vehiculo</option>
                            <option value="1">Automóvil</option>
                            <option value="2">Autobús</option>
                        </select>
                    )}
                    <input type="email" name="email" placeholder="Email" value={usuario.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Contraseña" value={usuario.password} onChange={handleChange} required />
                </div>
                <button type="submit">Registrar Usuario</button>
            </form>

            <button 
                onClick={handleNavigate} 
                
            >
                Insertar datos desde exel
            </button>
        </div>
    );
};

export default C_usuario;
