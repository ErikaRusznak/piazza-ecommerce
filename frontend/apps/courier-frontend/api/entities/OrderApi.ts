import {api} from "components";

export const getOrdersForCourierApi = (email: string) => {
    return api.get(`/api/orders/email/${email}`)
}

export const markOrderAsShippingApi = (id: number) => {
    return api.put(`/api/orders/${id}/shipping`)
}

export const markOrderAsDeliveredApi = (id: number) => {
    return api.put(`/api/orders/${id}/delivered`)
}
