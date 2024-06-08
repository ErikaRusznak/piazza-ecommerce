import { api } from 'components';

export const getAllUserSellersApi = () => {
    return api.get("/api/users/sellers");
};

export const deleteAccountForBuyerByIdApi = (accountId:number) => {
    return api.delete(`/api/users/buyer/${accountId}`)
}

export const forgotPasswordApi = (email: string) => {
    return api.post(`/api/forgot-password/client`, {},{
        params: {
            email: email
        }
    });
}

export const resetPasswordApi = (token: string, newPassword: string) => {
    return api.post("/api/users/reset-password", {}, {
        params: {
            token: token,
            newPassword: newPassword
        }
    });
}