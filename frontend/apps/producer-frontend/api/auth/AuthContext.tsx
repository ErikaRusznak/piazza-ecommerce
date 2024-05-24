"use client"
import {createContext, ReactElement, useContext} from "react";
import {executeJwtAuthenticationService, registerApiService} from "./AuthenticationApiService";
import {getUserRoleByEmail} from "../entities/UserAccount";
import {useSessionStorage} from "../../hooks/useSessionStorage";
import {useRouter} from "next/navigation";
import {getUserAccountByEmail} from "client-frontend/api/entities/UserAccount";

type AuthContextType = {
    isAuthenticated: boolean;
    username: string;
    token: string;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    registerUser: (sellerDto: any) => Promise<boolean>;
    id: number;
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
    const [id, setId] = useSessionStorage("id", "");
    const [token, setToken] = useSessionStorage("token", "");
    const router = useRouter();

    const registerUser = async (sellerDto: any) => {
        const { status } = await registerApiService(sellerDto);
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
            const { data } = await getUserRoleByEmail(username);
            const user = await getUserAccountByEmail(username);
            if (status === 200 && data === "SELLER" && user) {
                setAuthenticated(true);
                const newToken = 'Bearer ' + jwtToken;
                setToken(newToken);
                setUsername(username);
                setId(user.data.id)

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
        router.push("/login");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, registerUser, username, token, id }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
