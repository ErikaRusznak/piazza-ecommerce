import {api} from "../ApiClient";

export const getSellerByEmailApi = (email) => {
    return api.get(`/seller/${email}`)
}

export const getSellerByAliasApi = (alias) => {
    return api.get(`/sellerAlias/${alias}`)
}