"use client";
import {createContext, ReactElement, useContext} from "react";
import {useRouter} from "next/navigation";
import {executeJwtAuthenticationService} from "../api/auth/authApi";
import {getUserAccountByEmail, getUserRoleByEmail} from "../api/entities/UserAccount";
import {useSessionStorage} from "../hooks/useSessionStorage";
import {api} from "../api/ApiClient";

type AuthContextType = {
    isAuthenticated: boolean;
    username: string;
    token: string;
    login: (username: string, password: string) => Promise<boolean>;
    registerUser: (email: string, password: string, firstName: string, lastName: string, telephone: string, image: string, userRole: string) => Promise<boolean>;
    logout: () => void;
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
    registerPath?: string;
    userRole: string;
    children: ReactElement;
};
const AuthProvider = ({ children, userRole, registerPath}: AuthProviderProps) => {
    const [isAuthenticated, setAuthenticated] = useSessionStorage("isAuthenticated", false);
    const [username, setUsername] = useSessionStorage("username", "");
    const [id, setId] = useSessionStorage("id", "");
    const [token, setToken] = useSessionStorage("token", "");
    const router = useRouter();

    const registerApi = (email: string, password:string, firstName:string, lastName:string, telephone:string, image:string, userRole:any) => {
        return api.post(`/${registerPath}`,
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                telephone: telephone,
                image: image,
                password: password,
                userRole: userRole,
            })
    }

    const registerUser = async (email: string, password: string, firstName: string, lastName: string, telephone: string, image: string, userRole: string) => {
        if (registerPath) {
            const { status } = await registerApi(email, password, firstName, lastName, telephone, image, userRole);
            if (status === 201) {
                return true;
            } else {
                logout();
                return false;
            }
        } else {
            console.error("registerApiService not provided");
            return false;
        }
    }

    const login = async (username: string, password: string) => {
        try {
            const { status, data: { token: jwtToken } } = await executeJwtAuthenticationService(username, password);
            const { data } = await getUserRoleByEmail(username);
            const user = await getUserAccountByEmail(username);
            if (status === 200 && data === userRole && user) {
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
