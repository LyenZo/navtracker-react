import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/n_global_m.css";

const N_global_m = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-bottom">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img src="/img/home.png" alt="Logo" className="navbar-logo" />
                    </Link>
                    <Link to="/" className="navbar-brand">
                        <img src="/img/logo_2.png" alt="Logo" className="navbar-img" />
                    </Link>
                    <Link to="/" className="navbar-brand">
                        <img src="/img/rastreo.png" alt="Logo" className="navbar-img" />
                    </Link>
                    <Link to="/sesion" className="navbar-brand">
                        <img src="/img/perfil.png" alt="Logo" className="navbar-img" />
                    </Link>
                    <ul className="navbar-nav ms-auto">
                    </ul>
                    <p className="texto">Inicio</p>
                    <p className="texto">Rastreadores</p>
                    <p className="texto">Ubicación</p>
                    <p className="texto">Perfil</p>
                </div>
            </nav>
        </div>
    );
};

export default N_global_m;
