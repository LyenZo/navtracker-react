import Create_rastreo from "../components/CRUDS/rastreo/create_rastreo";
import List_rastreo from "../components/CRUDS/rastreo/list_rastreo";
import Excel_rastreo from "../components/CRUDS/rastreo/excel_rastreo";


const Crud_rastreo = () => {
    return (
        <div>
            <Create_rastreo />
            <List_rastreo />
            <Excel_rastreo />
        </div>
    );
}; 

export default Crud_rastreo;