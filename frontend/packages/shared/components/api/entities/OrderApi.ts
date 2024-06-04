import {api} from "../ApiClient";

export const getOrderByIdApi = (id: number) => {
    return api.get(`/api/orders/${id}`)
}
