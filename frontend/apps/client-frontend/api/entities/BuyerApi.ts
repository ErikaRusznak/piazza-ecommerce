import {api} from "components";
import {ShippingAddressType} from "@/app/checkout/page";

export const getBuyerByEmailApi = (email: string) => {
    return api.get(`/api/buyer/${email}`)
}

export const getBuyerAddresses = () => {
    return api.get("/api/buyer/my-buyer-addresses")
}

export const updateShippingAddress = (shippingAddress: ShippingAddressType) => {
    return api.put('/api/buyer/my-buyer-addresses', shippingAddress)
}

export const addShippingAddress = (shippingAddress: ShippingAddressType) => {
    return api.post('/api/buyer/my-buyer-addresses', shippingAddress)
}

export const addFavorite = (productId: number) => {
    return api.put('/api/buyer/my-favorites', {},{
        params: {
            productId
        }
    })
}

export const removeFavorite = (productId: number) => {
    return api.delete('/api/buyer/my-favorites',{
        params:{
            productId
        }
    })
}

export const getFavorites = () => {
    return api.get(`/api/buyer/my-favorites`)
}