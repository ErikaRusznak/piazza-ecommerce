import { api } from 'components'

export const getAllUsersApi = () => {
    return api.get("/users");
}

export const deleteAccountForSellerByIdApi = (accountId:string) => {
    return api.delete(`/users-seller/${accountId}`)
};

export const updateSellerAddressApi = (id: number, address: any) => {
    return api.put(`/seller/legal-address/${id}`, address)
}

export const forgotPasswordApi = (email: string) => {
    return api.post(`/forgot-password-seller`, {},{
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