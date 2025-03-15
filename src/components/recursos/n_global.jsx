import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const N_global = () => {
    return (
        <div>
            {/* Estilos internos */}
            <style>
                {`
                    .navbar {
                        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
                    }

                    .navbar-brand img {
                        height: 60px;
                        width: auto;
                    }

                    .navbar-nav .nav-link {
                        color: #333;
                        font-weight: 500;
                    }

                    .navbar-nav .nav-link:hover {
                        background-color: #f8f9fa;
                        border-radius: 4px;
                    }

                    .navbar-nav .nav-item {
                        margin-left: 15px;
                    }

                    /* Barra fija en la parte superior */
                    .navbar.fixed-top {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        z-index: 1000;
                    }

                    /* Espacio para el contenido principal para evitar que quede debajo de la barra fija */
                    .content {
                        margin-top: 80px; /* Espacio adicional para evitar que el contenido se superponga con la barra fija */
                    }

                    /* Estilos para el mensaje en la parte superior */
                    .message-top {
                        background-color: #f8d7da;
                        color: #721c24;
                        padding: 10px;
                        text-align: center;
                        font-size: 18px;
                        font-weight: bold;
                        position: fixed;
                        top: 60px; /* Lo coloca justo debajo de la barra de navegación */
                        left: 0;
                        width: 100%;
                        z-index: 999;
                    }

                    /* Alineación del logo en la parte superior de la barra */
                    .navbar-brand {
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        padding-left: 15px; /* Asegura que haya espacio a la izquierda */
                    }
                `}
            </style>

            {/* Barra de navegación */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
                <div className="container-fluid">
                    {/* Logo */}
                    <Link className="navbar-brand" to="/">
                        <img src="/img/logo.png" alt="Logo" className="me-2 ms-3" />
                    </Link>

                    {/* Contenedor de los botones de inicio de sesión y registro */}
                    <div className="d-flex ms-auto">
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

            {/* Mensaje en la parte superior */}
            <div className="message-top">
                Este es un mensaje en la parte superior de la página.
            </div>

            {/* Contenido principal */}
            <div className="content">
                {/* Aquí va el contenido principal */}
            </div>
        </div>
    );
};

export default N_global;
