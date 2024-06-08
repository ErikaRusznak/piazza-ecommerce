import { api } from "components";

export const deleteAccountForCourierByIdApi = (accountId:number) => {
    return api.delete(`/api/users/courier/${accountId}`)
}

export const forgotPasswordApi = (email: string) => {
    return api.post(`/api/forgot-password/courier`, {},{
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