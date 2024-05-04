import { api } from '../ApiClient'

export const getUserRoleByEmail = (email: string) => {
    return api.get(`/users/${email}/role`)
}

export const getUserAccountByEmail = (email: string) => {
    return api.get(`/users/${email}`);
}

export const getAllUsersApi = () => {
    return api.get("/users");
}

export const updateUserAccountApi = (id: number, firstName: string, lastName: string, email: string, imageName: string, telephone: string) => {
    return api.put(`/users/${id}`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        imageName: imageName,
        telephone: telephone,
    })
};

export const deleteAccountForSellerByIdApi = (accountId:string) => {
    return api.delete(`/users-seller/${accountId}`)
};

export const updateSellerLegalDetailsApi = (id:number, legalDetails:any) => {
    return api.put(`/sellers/legal-details/${id}`, legalDetails);
};

export const updateSellerAddressApi = (id: number, address: any) => {
    return api.put(`/seller/legal-address/${id}`, address)
}