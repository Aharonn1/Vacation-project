import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/User-Model";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Service/AuthService";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const[user,setUser] = useState<UserModel>();

    useEffect(()=>{
        setUser(authStore.getState().user);

        authStore.subscribe(()=>{
            setUser(authStore.getState().user)
        })
    },[])

    function logout():void{
        authService.logout();
    }

    return (
        <div className="AuthMenu">
        
            {!user && <>
            <span>hello guest</span>
            <span></span>
            <NavLink to={"/login"}>Login</NavLink>
            <span>|</span>
            <NavLink to={"/register"}>Register</NavLink>

            </>}
        
                {user && <>
                <span>hello {user.firstName} {user.lastName} |</span>
                    <NavLink className="Logout" to={"/home"} onClick={logout}>Logout</NavLink>
                </>

                }


        </div>
    );
}

export default AuthMenu;
