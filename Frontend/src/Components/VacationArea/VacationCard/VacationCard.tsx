import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/Vacation-Model";
import followersService from "../../../Service/FollowingService";
import config from "../../../Utils/appConfig";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    // useEffect(()=>{
    //     console.log(props.vacation);
        
    // },[])

    function isFollowing(isFollowing: number): Boolean {
        return isFollowing === 1 ? true : false;
    }

    async function follow(vacationId: number): Promise<void> {
        try {
            await followersService.addFollow(props.vacation.vacationId)
        }
        catch (err: any) {
            console.error(err)
        }
    }

    async function unFollow(vacationId: number): Promise<void> {
        try {
            await followersService.unfollow(props.vacation.vacationId)
        }
        catch (err: any) {
            console.error(err)
        }
    }



    const navigate = useNavigate();

    return (
        <div className="VacationCard" id={props.vacation.destination}>
            <div className="card card-blog">
                <div className="card-image">
                    <img className="img" src={config.vacationsImagesUsersUrl + props.vacation.imageName} />
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
                        {!isFollowing(props.vacation.idFollowing) ? <button className="btn btn-outline-primary"
                         onClick={() => follow(props.vacation.vacationId)}>Follow
                        </button> : <button className="btn btn-outline-secondary" 
                        onClick={() => unFollow(props.vacation.vacationId)}>Following</button>}
                        <br />Followers: {props.vacation.followersCount}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VacationCard;
