import {createContext, useContext, useEffect, useReducer, useRef, useState} from "react";
import {executeJwtAuthenticationService, registerApiService} from "./AuthenticationApiService";
import {useSessionStorage} from "../../hooks/useSessionStorage";
import {getUserStatusByEmail} from "../entities/UserAccount";

const authContext = createContext(undefined)
export const useAuth = () => useContext(authContext)


function AuthProvider({children}){

    const [isAuthenticated, setAuthenticated] = useSessionStorage("isAuthenticated", false);
    const [username, setUsername] = useSessionStorage("username", "");
    const [token, setToken] = useSessionStorage("token", "");

    async function registerUser(email, password, firstName, lastName, telephone, image, userStatus){
        const {status} = await registerApiService(email, password, firstName, lastName, telephone, image, userStatus)
        if(status===201){
            return true
        }else{
            logout()
            return false
        }
    }

    async function login(username, password){
        try{
            const {status, data:{token: jwtToken }} = await executeJwtAuthenticationService(username, password)

            if(status===200){
                setAuthenticated(true);

                const newToken = 'Bearer ' + jwtToken;
                setToken(newToken);
                setUsername(username);

                return true
            }

            else{
                logout()
                return false
            }

        }catch(error){
            logout()
            return false
        }
    }

    async function getUserRole() {
        try {
            const { data: { userStatus } } = await getUserStatusByEmail(username);
            return userStatus;
        } catch(error) {
            console.log("Error getting user role: ", error);
            return null;
        }
    }

    function logout(){
        sessionStorage.removeItem("userStatus");
        setToken(null);
        setAuthenticated(false);
        setUsername(null);
        window.location.reload();
    }

    return (
        <authContext.Provider value={{isAuthenticated, login, logout, registerUser, username, token, getUserRole}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider