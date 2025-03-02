import { Link } from "react-router-dom";

const Menu_cruds = () => {
    return (
        <div>
            <h2 >Bienvenido Administrador</h2>
            <p >Seleccione una opción:</p>
            <Link to="/r_punto">
                <button >
                    Ir al Puntos de Ruta
                </button>
            </Link>
            <Link to="/r_rastreo">
                <button >
                    Ir al Rastreador
                </button>
            </Link>
            <Link to="/r_ruta">
                <button >
                    Ir al Ruta
                </button>
            </Link>
            <Link to="/r_tipo">
                <button >
                    Ir al Tipos de Usuario
                </button>
            </Link>
            <Link to="/r_usuario">
                <button >
                    Ir al Usuarios
                </button>
                <Link to="/r_vehiculo">
                <button>
                    Ir a vehiculos
                </button>
            </Link>
            </Link>
        </div>
    );
};

export default Menu_cruds;
