import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/n_global.css";

const N_global = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand ms-3" to="/">
                        <img src="/img/logo.png" alt="Logo" />
                    </Link>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Inicia Sesión</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/create_usuario">Regístrate</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default N_global;
