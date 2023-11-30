import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import UserModel from "../Models/User-Model";

export class AuthState{
    public token:string = null;
    public user:UserModel = null;

    // load back the token from storage if exits
    public constructor(){
        this.token = localStorage.getItem("token");
        if(this.token){
            const userContainer = jwtDecode<{user:UserModel}>(this.token)
            this.user = userContainer.user
        }
    }
}

export enum AuthActionType{
    Register = "Register",
    Login = "Login",
    Logout = "Logout",
}

export interface AuthAction{
    type:AuthActionType;
    payload?:string;
}

export function authReducer(currentState = new AuthState(),action:AuthAction):AuthState{
    
    const newState = {...currentState};

    switch(action.type){
        case AuthActionType.Register:
        case AuthActionType.Login:
            newState.token = action.payload;
            const userContainer = jwtDecode<{user:UserModel}>(newState.token)
            newState.user = userContainer.user
            localStorage.setItem("token",newState.token);
            break;

        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token")//remove token when logged out
        break;
    }
    return newState
}


export const authStore = createStore(authReducer);