import vacationService from "../../../Service/VacationService";
import VacationModel from "../../../Models/Vacation-Model";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const { register, handleSubmit } = useForm<VacationModel>();
    const navigate = useNavigate();

    async function send(vacation: VacationModel) {
        vacation.image = (vacation.image as unknown as FileList)[0]
        vacationService.addVacation(vacation);
        navigate("/vacations")
    }

    return (
        <div className="AddVacation Box">
            <h1>added vacation</h1>
            <form onSubmit={handleSubmit(send)}>

                <label>destination</label>
                <input type="text" {...register("destination")} />

                <label>Description</label>
                <input type="text" {...register("description")} />

                <label>start date</label>
                <input type="date" {...register("startDate")} />

                <label>end date</label>
                <input type="date" {...register("endDate")} />

                <label>price</label>
                <input type="number" {...register("price")} />

                <label>image</label>
                <input type="file" {...register("image")} />

                <button>Add</button>
            </form>
            <NavLink to="/admin/vacation">Back</NavLink>
        </div>
    );
}

export default AddVacation;