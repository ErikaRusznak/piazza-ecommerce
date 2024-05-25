import {api} from "components";

export const getOrdersForCourierApi = (email: string) => {
    return api.get(`/orders/${email}`)
}

export const markOrderAsShippingApi = (id: number) => {
    return api.put(`/orders/${id}/shipping`)
}

export const markOrderAsDeliveredApi = (id: number) => {
    return api.put(`/orders/${id}/delivered`)
}
