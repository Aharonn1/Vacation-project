import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/Vacation-Model";
import vacationService from "../../../Service/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import VacationCardForAdmin from "../VacationCardForAdmin/VacationCardForAdmin";
import "./VacationForAdmin.css";

function VacationForAdmin(): JSX.Element {

    const[vacation,setVacation] = useState<VacationModel[]>([]);

    useEffect(() => {
        vacationService.getAllVacationForAdmin()
        .then(vacation => setVacation(vacation))
        .catch(err => alert(err.message))
    },[])    

    return (
        <div className="VacationForAdmin">
            <NavLink to = "/vacation/new">➕</NavLink>
            <div className="cardDiv">
            {vacation.map((item) => <VacationCardForAdmin key={item.vacationId} vacation={item}/>) }

            </div>
        </div>
    );
}

export default VacationForAdmin;
