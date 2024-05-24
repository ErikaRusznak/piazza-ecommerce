import {api} from "../ApiClient";

export const getSellerByIdApi = (id: number) => {
    return api.get(`/seller/${id}`);
}

export const getAllSellersApi = () => {
    return api.get('/sellers')
}