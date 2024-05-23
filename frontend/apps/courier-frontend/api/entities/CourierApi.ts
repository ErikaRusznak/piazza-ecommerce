import { api } from '../ApiClient'

export const getCourierByEmailApi = (email: string) => {
    return api.get(`/courier/${email}`)
};
