import {api} from "components";

export const getCartItems = () => {
    return api.get(`/my-cart`)
}

export const removeCartItem = (productId: number) => {
    return api.delete('/my-cart',{
        params:{
            productId
        }
    })
}

export const addOrUpdateCartItem = (productId:number, quantity:number) => {
    return api.put('/my-cart',{}, {
        params:{
            productId,
            quantity
        }
    })
}