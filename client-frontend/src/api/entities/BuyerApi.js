import {api} from "../ApiClient";

export const getBuyerByEmailApi = (email) => {
    return api.get(`/buyer/${email}`)
}

export const getBuyerAddresses = () => {
    return api.get("/my-buyer-addresses")
}

export const updateShippingAddress = (shippingAddress) => {
    return api.put('/my-buyer-addresses', shippingAddress)
}

export const addShippingAddress = (shippingAddress) => {
    return api.post('/my-buyer-addresses', shippingAddress)
}

export const addFavorite = (productId) => {
    return api.put('/my-favorites', {},{
        params: {
            productId
        }
    })
}

export const removeFavorite = (productId) => {
    return api.delete('/my-favorites',{
        params:{
            productId
        }
    })
}

export const getFavorites = () => {
    return api.get(`/my-favorites`)
}