import {api} from "../ApiClient";

export const getSellerByEmailApi = (email: string) => {
    return api.get(`/seller/${email}`)
}

export const getSellerByAliasApi = (alias: string) => {
    return api.get(`/sellerAlias/${alias}`)
}

export const getAllSellersApi = () => {
    return api.get('/sellers')
}