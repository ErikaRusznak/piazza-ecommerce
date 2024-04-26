import {api} from "../ApiClient";

export const getOrdersApi = (page:number, itemsPerPage:number, sortSpecs:any, filterSpecs:any) => {
    return api.get(`/orders`, {
        params: {
            page: page,
            itemsPerPage: itemsPerPage,
            sort: JSON.stringify(sortSpecs),
            filter: JSON.stringify(filterSpecs)
        }
    })
}

export const getOrderByIdApi = (id: number) => {
    return api.get(`/order/${id}`)
}

export const markOrderAsProcessingApi = (id: number) => {
    return api.put(`/orders/${id}/processing`)
}

export const markAsReadyToShip = (id: number) => {
    return api.put(`/orders/${id}/ready-to-ship`)
}

export const markOrderAsCanceledApi = (id: number) => {
    return api.put(`/orders/${id}/canceled`)
}
