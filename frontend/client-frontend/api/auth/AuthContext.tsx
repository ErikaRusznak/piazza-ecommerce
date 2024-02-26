"use client"
import {createContext, ReactElement, useContext} from "react";
import {executeJwtAuthenticationService, registerApiService} from "./AuthenticationApiService";
import {getUserStatusByEmail} from "../entities/UserAccount";
import {useSessionStorage} from "../../hooks/useSessionStorage";

type AuthContextType = {
    isAuthenticated: boolean;
    username: string;
    token: string;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    registerUser: (email: string, password: string, firstName: string, lastName: string, telephone: string, image: string, userStatus: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const contextValue = useContext(AuthContext);
    if (!contextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return contextValue;
};

type AuthProviderProps = {
    children: ReactElement;
};
const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setAuthenticated] = useSessionStorage("isAuthenticated", false);
    const [username, setUsername] = useSessionStorage("username", "");
    const [token, setToken] = useSessionStorage("token", "");

    const registerUser = async (email: string, password:string, firstName:string, lastName:string, telephone:string, image:string, userStatus:string) => {
        const { status } = await registerApiService(email, password, firstName, lastName, telephone, image, userStatus);
        if (status === 201) {
            return true;
        } else {
            logout();
            return false;
        }
    }

    const login = async (username: string, password: string) => {
        try {
            const { status, data: { token: jwtToken } } = await executeJwtAuthenticationService(username, password);
            const { data } = await getUserStatusByEmail(username);
            if (status === 200 && data === "CLIENT") {

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
            setToken(null);
            setAuthenticated(false);
            setUsername(null);
            return false;
        }
    }

    const logout = () => {
        setToken(null);
        setAuthenticated(false);
        setUsername(null);
        window.location.reload();
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, registerUser, username, token }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
