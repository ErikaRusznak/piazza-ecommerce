import {api} from "../ApiClient";


export const getOrderByIdApi = (id: number) => {
    return api.get(`/order/${id}`)
}

export const markOrderAsProcessingApi = (id: number) => {
    return api.put(`/orders/${id}/processing`)
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
