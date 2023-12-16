import {api} from "../ApiClient";

export const getCartItems = () => {
    return api.get(`/my-cart`)
}

export const removeCartItem = (productId) => {
    return api.delete('/my-cart',{
        params:{
            productId
        }
    })
}

export const addOrUpdateCartItem = (productId, quantity) => {
    return api.put('/my-cart',{}, {
        params:{
            productId,
            quantity
        }
    })
}