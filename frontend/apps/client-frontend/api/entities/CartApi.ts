import {api} from "components";

export const getCartItems = () => {
    return api.get(`/api/cart`)
}

export const removeCartItem = (productId: number) => {
    return api.delete('/api/cart',{
        params:{
            productId
        }
    })
}

export const addOrUpdateCartItem = (productId:number, quantity:number) => {
    return api.put('/api/cart',{}, {
        params:{
            productId,
            quantity
        }
    })
}