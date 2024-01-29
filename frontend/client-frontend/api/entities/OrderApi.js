import {api} from "../ApiClient";

export const submitOrder = (shippingAddress, products, email) => {
    return api.post('/order', {
        shippingAddress: shippingAddress,
        products: products,
        email: email
    })
}

export const getFullOrderByIdApi = (fullOrderId) => {
    return api.get(`/fullOrder/${fullOrderId}`)
}
