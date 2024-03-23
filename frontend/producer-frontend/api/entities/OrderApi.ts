import {api} from "../ApiClient";

export const getOrdersForSellerApi = (sellerEmail: string) => {
    return api.get(`/orders/${sellerEmail}`)
}

export const getOrderByIdApi = (id: number) => {
    return api.get(`/order/${id}`)
}
