import {api} from "../ApiClient"

export function executeJwtAuthenticationService(username, password){
    return api.post(`/authenticate`,{username, password})
}

export function registerApiService(email, password, firstName, lastName, telephone, image, userStatus){
    return api.post('/register-client',
        {
            firstName: firstName,
            lastName: lastName,
            email: email,
            telephone: telephone,
            image: image,
            password: password,
            userStatus: userStatus,
        })
}