import {api} from "../ApiClient";

export const getOrdersForSellerApi = (sellerEmail: string) => {
    return api.get(`/orders/${sellerEmail}`)
}

export const getOrdersApi = (page:number, itemsPerPage:number, sortSpecs:any, filterSpecs:any) => {
    return api.get(`/orders-try`, {
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

export const markOrderAsShippingApi = (id: number) => {
    return api.put(`/orders/${id}/shipping`)
}

export const markOrderAsDeliveredApi = (id: number) => {
    return api.put(`/orders/${id}/delivered`)
}

export const markOrderAsCanceledApi = (id: number) => {
    return api.put(`/orders/${id}/canceled`)
}
