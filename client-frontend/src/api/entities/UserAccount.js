import { api } from '../ApiClient'

export const getUserStatusByEmail = (email) => {
    return api.get(`/users/${email}/role`)
}