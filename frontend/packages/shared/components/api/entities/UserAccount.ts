import {api} from "../ApiClient";

export const getUserRoleByEmail = (email: string) => {
    return api.get(`/api/users/${email}/role`)
};

export const getUserAccountByEmail = (email: string) => {
    return api.get(`/api/users/${email}`);
};

export const updateUserAccountApi = (id: number, firstName: string, lastName: string, email: string, imageName: string | null, telephone: string) => {
    return api.put(`/api/users/${id}`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        imageName: imageName,
        telephone: telephone,
    })
};

export const getUserByIdApi = (id: number) => {
    return api.get(`/api/users/id/${id}`);
}
