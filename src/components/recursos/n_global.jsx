import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const N_global = () => {
    return (
        <div>
            {/* Barra de navegación */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Inicio</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/c_usuario">Formulario</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
            {/* Contenido principal */}
            <div className="container mt-4">
                <h2>Bienvenido</h2>
                <p>Seleccione una opción:</p>
                <Link to="/login" className="btn btn-primary me-2">Ir a Login</Link>
                <Link to="/c_usuario" className="btn btn-secondary">Ir al Formulario</Link>
            </div>
        </div>
    );
};

export default N_global;