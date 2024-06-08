import {api} from "components";

export const getSellerByAliasApi = (alias: string) => {
    return api.get(`/api/seller/sellerAlias/${alias}`)
}

export const getAllSellersApi = () => {
    return api.get('/api/sellers')
}