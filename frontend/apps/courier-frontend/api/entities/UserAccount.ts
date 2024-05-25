import { api } from "components";

export const deleteAccountForCourierByIdApi = (accountId:string) => {
    return api.delete(`/users-courier/${accountId}`)
}

export const forgotPasswordApi = (email: string) => {
    return api.post(`/forgot-password-courier`, {},{
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