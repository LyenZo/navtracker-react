import R_usuario from "../components/CRUDS/read/r_usuario";
import C_usuario from "../components/CRUDS/create/c_usuario";
import C_exel from "../components/CRUDS/create/c_exel";


const Usuario = () => {
    return (
        <div>
            <C_usuario />
            <C_exel />
            <R_usuario/>
        </div>
    );
}; 

export default Usuario;