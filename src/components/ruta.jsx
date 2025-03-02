import { Link } from "react-router-dom";

const Ruta = () => {
    return (
        <div >
            <h2 >Bienvenido</h2>
            <p >Iniciar ruta:</p>

            <Link to="">
                <button >
                    Iniciar
                </button>
            </Link>
        </div>
    );
};

export default Ruta;
