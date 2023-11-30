import axios from "axios";
import CredentialsModel from "../Models/Credentials-Model";
import UserModel from "../Models/User-Model";
import { AuthActionType, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/appConfig";

class AuthService{

    public async register(user:UserModel):Promise<void>{
        //send user to backend
        

        const response = await axios.post<string>(appConfig.registerUrl,user);
        
        //get the returned token
        const token = response.data;

        console.log(token);
        
        //send token to global state
        authStore.dispatch({type:AuthActionType.Register,payload:token});

    }

    public async login(Credentials:CredentialsModel):Promise<void>{
        const response = await axios.post<string>(appConfig.loginUrl,Credentials);
        const token = response.data;
        authStore.dispatch({type:AuthActionType.Login,payload: token})
    }

    public logout():void{
        authStore.dispatch({type:AuthActionType.Logout})
    }

    public isLoggedIn():boolean{
        return authStore.getState().token !== null;
    }


}

const authService = new AuthService()
export default authService;