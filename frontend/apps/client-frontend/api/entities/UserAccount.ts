import { api } from 'components';

export const getAllUserSellersApi = () => {
    return api.get("/users/sellers");
};

export const deleteAccountForBuyerByIdApi = (accountId:string) => {
    return api.delete(`/users-buyer/${accountId}`)
}

export const forgotPasswordApi = (email: string) => {
    return api.post(`/forgot-password-client`, {},{
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