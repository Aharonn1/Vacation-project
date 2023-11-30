import axios from "axios";
import { request } from "http";
import { authStore } from "../Redux/AuthState";
import authService from "../Service/AuthService";

class Interceptor{
    public create():void{
        axios.interceptors.request.use(request => {

            //if user logged in 
            if(authService.isLoggedIn()){

                request.headers.authorization = "Bearer " + authStore.getState().token;
            }
            return request
        })
    }
}

const interceptor = new Interceptor();

export default interceptor