import {api} from "../ApiClient";
import {ShippingAddressType} from "@/app/checkout/page";

export const getBuyerByEmailApi = (email: string) => {
    return api.get(`/buyer/${email}`)
}

export const getBuyerAddresses = () => {
    return api.get("/my-buyer-addresses")
}

export const updateShippingAddress = (shippingAddress: ShippingAddressType) => {
    return api.put('/my-buyer-addresses', shippingAddress)
}

export const addShippingAddress = (shippingAddress: ShippingAddressType) => {
    return api.post('/my-buyer-addresses', shippingAddress)
}

export const addFavorite = (productId: number) => {
    return api.put('/my-favorites', {},{
        params: {
            productId
        }
    })
}

export const removeFavorite = (productId: string) => {
    return api.delete('/my-favorites',{
        params:{
            productId
        }
    })
}

export const getFavorites = () => {
    return api.get(`/my-favorites`)
}