import { api } from "components";

export const getCourierByEmailApi = (email: string) => {
    return api.get(`/courier/${email}`)
};
