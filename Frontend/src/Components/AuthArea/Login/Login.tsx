import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/Credentials-Model";
import UserModel from "../../../Models/User-Model";
import VacationModel from "../../../Models/Vacation-Model";
import authService from "../../../Service/AuthService";
import vacationService from "../../../Service/VacationService";
import "./Login.css";

function Login(): JSX.Element {

    const{register,handleSubmit} = useForm<CredentialsModel>();
    const[credentials,setCredentials] = useState<CredentialsModel>();
    const[vacation,setVacation] = useState<VacationModel[]>();
    const navigate = useNavigate();
    
    async function send(credentials:CredentialsModel) {
        try{
            const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            const email = credentials.email;
            const result: boolean = expression.test(email); // true
            console.log('e-mail is ' + (result ? 'correct' : 'incorrect'));
            console.log(credentials.email);
            await authService.login(credentials);
            if(credentials.email === "admin@gmail.com" && credentials.password === '12345678'){
                console.log("welcome admin");
                navigate("/admin/vacation");    
                await vacationService.getAllVacationForAdmin()
                .then(vacation => setVacation(vacation))
                .then(() =>  console.log("welcome admin"))
                .catch(err => alert(err.message))
             }
             else if(expression.test(email) == true){
                     console.log("welcome");
                     navigate("/vacation");    
                     await vacationService.getAllVacation()
                     .then(vacation => setVacation(vacation))
                     .catch(err => alert(err.message))
             }
        else{
            alert("the email is not valid")
        }
        }catch(err:any){
            alert(err.message)
        }
    }

    return (
        <div className="Login Box">
			
        <h2>login</h2>
        <form onSubmit={handleSubmit(send)}>

        <label>email</label>
        <input type="text"{...register("email")} required minLength={10} maxLength={50} />
        <br />

        <label>password</label>
        <input type="text"{...register("password")} required minLength={4} maxLength={256} />
        <br />

        <button>Login</button>
        </form>

        </div>
    );
}

export default Login;
