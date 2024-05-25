import {api} from "../ApiClient"

export const executeJwtAuthenticationService = (username: string, password: string) => {
    return api.post(`/authenticate`,{username, password})
}
