import {api} from "components";

export const getSellerByAliasApi = (alias: string) => {
    return api.get(`/sellerAlias/${alias}`)
}

export const getAllSellersApi = () => {
    return api.get('/sellers')
}