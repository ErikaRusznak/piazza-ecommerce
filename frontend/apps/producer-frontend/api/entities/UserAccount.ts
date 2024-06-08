import { api } from 'components'

export const getAllUsersApi = () => {
    return api.get("/api/users");
}

export const deleteAccountForSellerByIdApi = (accountId:string) => {
    return api.delete(`/api/users/seller/${accountId}`)
};

export const updateSellerAddressApi = (id: number, address: any) => {
    return api.put(`/api/sellers/legal-address/${id}`, address)
}

export const forgotPasswordApi = (email: string) => {
    return api.post(`/api/forgot-password/seller`, {},{
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