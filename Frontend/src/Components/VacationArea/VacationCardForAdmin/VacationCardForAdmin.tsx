import VacationModel from "../../../Models/Vacation-Model";
import appConfig from "../../../Utils/appConfig";
import { NavLink } from "react-router-dom";
import "./VacationCardForAdmin.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCardForAdmin(props: VacationCardProps): JSX.Element {

    return (
        <div className="VacationCardForAdmin ">
            <div className="card card-blog">
                <div className="card-image">
                    <NavLink to={"/vacation/details/" + props.vacation.vacationId}>
                        <img className="img" src={appConfig.vacationsImagesUsersUrl + props.vacation?.imageName} />
                    </NavLink>
                    <div className="ripple-cont"></div>
                </div>
                <div className="table">
                    <h4 className="card-caption">
                        {props.vacation.destination}
                    </h4>
                    <p className="card-description"> {props.vacation.description}</p>
                    <div className="ftr">
                        <div className="dates">
                            {props.vacation.startDate.slice(0, 10).split("-").reverse().join("/")}
                            <br />
                            Until:
                            <br />
                            {props.vacation.endDate.slice(0, 10).split("-").reverse().join("/")}
                        </div>
                    </div>
                    <br />
                    <div className="price">{props.vacation.price}$ <br />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VacationCardForAdmin;