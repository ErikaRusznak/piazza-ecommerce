import {api} from "components";

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

export const markOrderAsProcessingApi = (id: number) => {
    return api.put(`/api/orders/${id}/processing`)
}

export const markAsReadyToShip = (id: number) => {
    return api.put(`/api/orders/${id}/ready-to-ship`)
}

export const markOrderAsCanceledApi = (id: number) => {
    return api.put(`/api/orders/${id}/canceled`)
}
