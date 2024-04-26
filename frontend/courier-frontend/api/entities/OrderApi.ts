import {api} from "../ApiClient";


export const getOrderByIdApi = (id: number) => {
    return api.get(`/order/${id}`)
}

export const getOrdersForCourierApi = (email: string) => {
    return api.get(`/orders/${email}`)
}

export const markOrderAsShippingApi = (id: number) => {
    return api.put(`/orders/${id}/shipping`)
}

export const markOrderAsDeliveredApi = (id: number) => {
    return api.put(`/orders/${id}/delivered`)
}

export const markOrderAsCanceledApi = (id: number) => {
    return api.put(`/orders/${id}/canceled`)
}
