import { api } from '../ApiClient'

export const getUserStatusByEmail = (email: string) => {
    return api.get(`/users/${email}/role`)
}