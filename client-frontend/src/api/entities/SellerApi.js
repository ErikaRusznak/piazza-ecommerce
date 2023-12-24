import {api} from "../ApiClient";

export const getSellerByEmailApi = (email) => {
    return api.get(`/seller/${email}`)
}
