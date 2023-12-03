import { NavLink, useNavigate, useParams } from "react-router-dom";
import vacationService from "../../../Service/VacationService";
import VacationModel from "../../../Models/Vacation-Model";
import appConfig from "../../../Utils/appConfig";
import { useEffect, useState } from "react";
import "./DetailsVacationAdmin.css";

function DetailsVacationAdmin(): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        vacationService.getOneVacation(+params.vacationId)
            .then(vacation => setVacation(vacation))
            .catch(err => alert(err.message))
    }, [])

    async function deleteVacation() {
        const sure = window.confirm("Are you sure?");
        if (!sure) return;
        await vacationService.deleteVacation(vacation.vacationId);
        alert("Vacation has been deleted");
        navigate("/vacation");
    }

    return (
        <div className="DetailsVacationAdmin ">
            {vacation &&
                <>
                    <div className="card card-blog">
                        <div className="card-image">
                            <img className="img" src={appConfig.vacationsImagesUsersUrl + vacation.imageName} />
                            <div className="ripple-cont"></div>
                        </div>
                        <div className="table">
                            <h4 className="card-caption">
                                {vacation.destination}
                            </h4>
                            <p className="card-description"> {vacation.description}</p>
                            <div className="ftr">
                                <div className="dates">
                                    {vacation.startDate.slice(0, 10).split("-").reverse().join("/")}
                                    <br />
                                    Until:
                                    <br />
                                    {vacation.endDate.slice(0, 10).split("-").reverse().join("/")}
                                </div>
                            </div>
                            <br />
                            <div className="price">{vacation.price}$ <br />
                                <NavLink to="/admin/vacation">Back</NavLink>
                                <span> | </span>
                                <NavLink to={"/admin/vacations/update/" + vacation.vacationId}>update</NavLink>
                                <span> | </span>
                                <button onClick={() => deleteVacation()}>Delete</button>
                            </div>
                        </div>
                    </div>
                </>}
        </div>
    );
}

export default DetailsVacationAdmin;