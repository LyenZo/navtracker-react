import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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
            const response = await axios.post("http://18.118.253.191/api/login", usuario);
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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Inicio de Sesión</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        className="form-control" 
                                        placeholder="Email" 
                                        value={usuario.email} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contraseña</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        className="form-control" 
                                        placeholder="Contraseña" 
                                        value={usuario.password} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Iniciar Sesión
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;