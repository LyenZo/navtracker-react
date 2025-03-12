import Create_punto from "../components/CRUDS/punto_ruta/create_punto";
import List_punto from "../components/CRUDS/punto_ruta/list_punto";
import Excel_punto from "../components/CRUDS/punto_ruta/excel_punto";


const Crud_punto = () => {
    return (
        <div>
            <Create_punto />
            <List_punto />
            <Excel_punto />
        </div>
    );
}; 

export default Crud_punto;