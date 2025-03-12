import Create_usuario from "../components/CRUDS/usuario/create_usuario";
import List_usuario from "../components/CRUDS/usuario/list_usuario";
import Excel_usuario from "../components/CRUDS/usuario/excel_usuario";


const Crud_usuario = () => {
    return (
        <div>
            <Create_usuario />
            <List_usuario />
            <Excel_usuario />
        </div>
    );
}; 

export default Crud_usuario;