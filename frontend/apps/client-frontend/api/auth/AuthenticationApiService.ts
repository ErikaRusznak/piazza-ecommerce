"use server";
import {api} from "../ApiClient"

export async function registerApiService(email: string, password:string, firstName:string, lastName:string, telephone:string, image:string, userRole:any){
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