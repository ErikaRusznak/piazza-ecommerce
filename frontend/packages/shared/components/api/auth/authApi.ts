import {api} from "../ApiClient"

export function executeJwtAuthenticationService(username: string, password: string){
    return api.post(`/authenticate`,{username, password})
}
