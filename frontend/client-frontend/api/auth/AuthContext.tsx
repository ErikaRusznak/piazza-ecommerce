"use client"
import {createContext, JSXElementConstructor, ReactElement, useContext} from "react";
import { executeJwtAuthenticationService, registerApiService } from "./AuthenticationApiService";
import { getUserStatusByEmail } from "../entities/UserAccount";
import { useSessionStorage } from "../../hooks/useSessionStorage";

// Define the context type
interface AuthContextType {
    isAuthenticated: boolean;
    username: string;
    token: string;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    registerUser: (email: string, password: string, firstName: string, lastName: string, telephone: string, image: string, userStatus: string) => Promise<boolean>;
    getUserRole: () => Promise<string | null>;
}

const authContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const contextValue = useContext(authContext);
    if (!contextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return contextValue;
};

type AuthProviderProps = {
    children: ReactElement;
}
function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setAuthenticated] = useSessionStorage("isAuthenticated", false);
    const [username, setUsername] = useSessionStorage("username", "");
    const [token, setToken] = useSessionStorage("token", "");

    async function registerUser(email: string, password:string, firstName:string, lastName:string, telephone:string, image:string, userStatus:string) {
        const { status } = await registerApiService(email, password, firstName, lastName, telephone, image, userStatus);
        if (status === 201) {
            return true;
        } else {
            logout();
            return false;
        }
    }

    async function login(username: string, password: string) {
        try {
            const { status, data: { token: jwtToken } } = await executeJwtAuthenticationService(username, password);

            if (status === 200) {
                setAuthenticated(true);

                const newToken = 'Bearer ' + jwtToken;
                setToken(newToken);
                setUsername(username);

                return true;
            } else {
                logout();
                return false;
            }

        } catch (error) {
            logout();
            return false;
        }
    }

    async function getUserRole() {
        try {
            const { data: { userStatus } } = await getUserStatusByEmail(username);
            return userStatus;
        } catch (error) {
            console.log("Error getting user role: ", error);
            return null;
        }
    }

    function logout() {
        sessionStorage.removeItem("userStatus");
        setToken(null);
        setAuthenticated(false);
        setUsername(null);
        window.location.reload();
    }

    return (
        <authContext.Provider value={{ isAuthenticated, login, logout, registerUser, username, token, getUserRole }}>
            {children}
        </authContext.Provider>
    );
}

export default AuthProvider;
