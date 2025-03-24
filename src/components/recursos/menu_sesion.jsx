import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "../css/n_global_m.css"; 
import { color } from "chart.js/helpers";

const Menu = () => {
    return (
        <div className="menu-container">
            <div className="container text-center">
                <h2 className="mb-4 mt-5">Bienvenido a NavTracker</h2>
                <div>
                    <Link to="/login" className="btn" style={{color:"white",backgroundColor:"#1F6527"}}>
                        Iniciar Sesión
                    </Link>
                    <Link to="/create_usuario" className="btn" style={{color:"white",backgroundColor:"#1F6527"}}>
                        Registrarse
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Menu;
