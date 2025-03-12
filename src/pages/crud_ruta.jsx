import Create_ruta from "../components/CRUDS/ruta/create_ruta";
import List_ruta from "../components/CRUDS/ruta/list_ruta";
import Excel_ruta from "../components/CRUDS/ruta/excel_ruta";


const Crud_ruta = () => {
    return (
        <div>
            <Create_ruta />
            <List_ruta />
            <Excel_ruta />
        </div>
    );
}; 

export default Crud_ruta;