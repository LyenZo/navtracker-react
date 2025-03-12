import Create_vehiculo from "../components/CRUDS/vehiculo/create_vehiculo";
import List_vehiculo from "../components/CRUDS/vehiculo/list_vehiculo";
import Excel_vehiculo from "../components/CRUDS/vehiculo/excel_vehiculo";


const Crud_vehiculo = () => {
    return (
        <div>
            <Create_vehiculo />
            <List_vehiculo />
            <Excel_vehiculo />
        </div>
    );
}; 

export default Crud_vehiculo;