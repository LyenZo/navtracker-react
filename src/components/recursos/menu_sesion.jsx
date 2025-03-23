import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "../css/n_global_m.css"; 

const Menu = () => {
    return (
        <div className="menu-container">
            <div className="container text-center">
                <h2 className="mb-4 mt-5">Bienvenido a NavTracker</h2>
                <div className="btn-group" role="group">
                    <Link to="/login" className="btn boton-verde">
                        Iniciar sesión
                    </Link>
                    <Link to="/create_usuario" className="btn boton-verde">
                        Registrarse
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Menu;
