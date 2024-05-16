import { api } from '../ApiClient'

export const getUserRoleByEmail = (email: string) => {
    return api.get(`/users/${email}/role`)
};

export const getUserAccountByEmail = (email: string) => {
    return api.get(`/users/${email}`);
};

export const getAllConnectedUsers = () => {
    return api.get("/connectedUsers");
};

export const getAllUsersApi = () => {
    return api.get("/users");
};

export const getAllUserSellersApi = () => {
    return api.get("/users/sellers");
};

export const updateUserAccountApi = (id: number, firstName: string, lastName: string, email: string, imageName: string, telephone: string) => {
    return api.put(`/users/${id}`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        imageName: imageName,
        telephone: telephone,
    })
};

export const deleteAccountForBuyerByIdApi = (accountId:string) => {
    return api.delete(`/users-buyer/${accountId}`)
}

export const forgotPasswordApi = (email: string) => {
    return api.post(`/forgot-password`, {},{
        params: {
            email: email
        }
    });
}

export const resetPasswordApi = (token: string, newPassword: string) => {
    return api.post("/reset-password", {}, {
        params: {
            token: token,
            newPassword: newPassword
        }
    });
}