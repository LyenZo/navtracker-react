import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const N_global = () => {
    return (
        <div>
            {/* Barra de navegación */}
            <nav className="navbar navbar-expand-lg bg-white" style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img src="/img/logo.png" alt="Logo" width="100%"  height="60" className="me-2 ms-3" />
                    </Link>
                    <div className="d-flex ms-3">
                            {/* Aqui botones extra  */}
                        </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Inicia Sesión</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create_usuario">Regístrate</Link>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </nav>
            
            {/* Contenido principal */}
            
        </div>
    );
};

export default N_global;