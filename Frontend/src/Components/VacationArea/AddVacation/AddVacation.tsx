import { UploadedFile } from "express-fileupload";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/Vacation-Model";
import vacationService from "../../../Service/VacationService";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const [vacation,setVacation] = useState<VacationModel>();
    const{register,handleSubmit} = useForm<VacationModel>();
    const navigate = useNavigate();

    async function send(vacation:VacationModel){
        console.log(vacation);
        try{
            vacation.image = (vacation.image as unknown as FileList)[0]
            vacationService.addVacation(vacation);
            navigate("/vacations")
        }catch(err:any){
            alert(err.message)
        }
    }


    return (
        <div className="AddVacation Box">
			<h1>added vacation</h1>
            <form onSubmit={handleSubmit(send)}>

                <label>destination</label>
                <input type="text" {...register("destination")}/>
               
                <label>Description</label>
                <input type="text" {...register("description")}/>
                
                <label>start date</label>
                <input type="date" {...register("startDate")}/>

                <label>end date</label>
                <input type="date" {...register("endDate")}/>
                
                <label>price</label>
                <input type="number" {...register("price")}/>
                
                <label>image</label>
                <input type="file" {...register("image")} />

                <button>Add</button>
            </form>
            <NavLink to = "/admin/vacation">Back</NavLink>

            {/* <button>back{<NavLink></NavLink>}</button> */}
        </div>
    );
}

export default AddVacation;
