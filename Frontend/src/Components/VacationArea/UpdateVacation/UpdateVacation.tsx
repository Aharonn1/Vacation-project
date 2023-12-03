import vacationService from "../../../Service/VacationService";
import VacationModel from "../../../Models/Vacation-Model";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./UpdateVacation.css";

function UpdateVacation(): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>();
    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {
        vacationService.getOneVacation(+params.vacationId)
            .then(vacation => {
                setValue("vacationId", vacation.vacationId)
                setValue("destination", vacation.destination)
                setValue("description", vacation.description)
                setValue("startDate", vacation.startDate)
                setValue("endDate", vacation.endDate)
                setValue("price", vacation.price)
                setValue("image", vacation.image)
                setVacation(vacation)
            })
            .catch(err => alert(err.message))
    }, [])

    async function send(vacation: VacationModel) {
        vacation.image = (vacation.image as unknown as FileList)[0]
        await vacationService.updateVacation(vacation);
        navigate(-1); // Back
    }

    return (
        <div className="UpdateVacation Box">
            <h1>Update vacation</h1>
            <form onSubmit={handleSubmit(send)}>

                <input type="hidden" {...register("vacationId")} />

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

                <label>Image: </label>
                <input type="file"{...register("image")} />

                <button>Update</button>
            </form>
        </div>
    );
}

export default UpdateVacation;