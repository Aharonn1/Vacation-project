import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/User-Model";
import authService from "../../../Service/AuthService";
import "./Register.css";

function Register(): JSX.Element {
  
    const{register,handleSubmit,formState} = useForm<UserModel>();

    const navigate = useNavigate();

    
    async function send(user:UserModel) {
        try{
            const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            const email = user.email;
            const result: boolean = expression.test(email); // true
            console.log('e-mail is ' + (result ? 'correct' : 'incorrect'));
            console.log(user.email);
            console.log(user.email[1]);
            
            if(expression.test(email) == true){
                    console.log("welcome");
                    await authService.register(user);
                    alert("welcome " + user.firstName)
                    navigate("/vacation");    
            }else{
                alert("the email is not valid")
            }
            

            
        }catch(err:any){
            alert(err.message)
        }
    }

    

    function checkEmail(user:UserModel):void{
     
    }
  
    return (
        <div className="Register Box">
			
            <h2>register</h2>

            <form onSubmit={handleSubmit(send)}>

            <label>first name</label>
            <input type="text" {...register("firstName")}required minLength={3} maxLength={30} />

            <label>last name</label>
            <input type="text" {...register("lastName")} required minLength={3} maxLength={30} />

            <label>email</label>
            <input type="text" {...register("email")} required maxLength={50} />

            <label>password</label>
            <input type="text" {...register("password")} required minLength={4} maxLength={256} />
            
            <button>Register</button>
            </form>

        </div>
    );
}

export default Register;
