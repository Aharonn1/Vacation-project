import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import AddVacation from "../../VacationArea/AddVacation/AddVacation";
import DetailsVacationAdmin from "../../VacationArea/DetailsVacationAdmin/DetailsVacationAdmin";
import UpdateVacation from "../../VacationArea/UpdateVacation/UpdateVacation";
import VacationCardForAdmin from "../../VacationArea/VacationCardForAdmin/VacationCardForAdmin";
import VacationForAdmin from "../../VacationArea/VacationForAdmin/VacationForAdmin";
import VacationList from "../../VacationArea/VacationList/VacationList";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path ="vacation"element={<VacationList/>}/>
            <Route path = "/admin/vacation"element={<VacationForAdmin/>}/>
            <Route path = "/vacation/new" element={<AddVacation/>}/>
            <Route path = "admin/vacations/update/:vacationId" element={<UpdateVacation />} />
            <Route path= "vacation/details/:vacationId" element={<DetailsVacationAdmin/>}/>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>

    );
}

export default Routing;
