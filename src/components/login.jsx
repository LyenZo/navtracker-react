import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [usuario, setUsuario] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("http://localhost:3001/api/login", usuario);
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                alert("Inicio de sesión exitoso");
                navigate("/perfil");
            } else {
                setError("Credenciales incorrectas");
            }
        } catch (error) {
            setError("Hubo un problema al iniciar sesión. Intenta de nuevo.");
        }
    };

    return (
        <div>
            <h2>Inicio de Sesión</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit} >
                <input type="email" name="email" placeholder="Email" value={usuario.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Contraseña" value={usuario.password} onChange={handleChange} required />
                <button type="submit">
                    Iniciar Sesión
                </button>
            </form>
            <Link to="/recuperar" >
                ¿Olvidaste tu contraseña?
            </Link>
        </div>
    );
};

export default Login;
