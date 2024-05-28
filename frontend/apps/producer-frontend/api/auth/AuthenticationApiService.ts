import {api} from "components"

export function executeJwtAuthenticationService(username: string, password: string){
    return api.post(`/authenticate`,{username, password})
}

export function registerApiService(sellerDTO: any) {
    return api.post("/register-seller", sellerDTO);
}