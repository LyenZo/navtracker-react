import Create_tipo from "../components/CRUDS/u_tipo/create_tipo";
import List_tipo from "../components/CRUDS/u_tipo/list_tipo";
import Excel_tipo from "../components/CRUDS/u_tipo/excel_tipo";


const Crud_tipo = () => {
    return (
        <div>
            <Create_tipo />
            <List_tipo />
            <Excel_tipo />
        </div>
    );
}; 

export default Crud_tipo;