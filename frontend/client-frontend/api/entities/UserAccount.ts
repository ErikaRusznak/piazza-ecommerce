import { api } from '../ApiClient'

export const getUserStatusByEmail = (email: string) => {
    return api.get(`/users/${email}/role`)
}

export const getUserAccountByEmail = (email: string) => {
    return api.get(`/users/${email}`);
}

export const getAllConnectedUsers = () => {
    return api.get("/connectedUsers");
}

export const getAllUsersApi = () => {
    return api.get("/users");
}