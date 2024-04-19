import {api} from "../ApiClient"

export function executeJwtAuthenticationService(username: string, password: string){
    return api.post(`/authenticate`,{username, password})
}

export function registerApiService(email: string, password:string, firstName:string, lastName:string, telephone:string, image:string, userRole:any){
    return api.post('/register-client',
        {
            firstName: firstName,
            lastName: lastName,
            email: email,
            telephone: telephone,
            image: image,
            password: password,
            userRole: userRole,
        })
}