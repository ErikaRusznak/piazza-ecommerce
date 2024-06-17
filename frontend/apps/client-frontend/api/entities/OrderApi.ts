import {api, baseURL} from "components";
import {ShippingAddressType} from "@/app/checkout/page";

export const submitOrder = (
    shippingAddress: ShippingAddressType,
    products: {
        quantity: number;
        productId: number }[] | undefined,
    email: string,
    paymentType: string) => {
    return api.post('/api/orders', {
        shippingAddress: shippingAddress,
        products: products,
        email: email,
        paymentType: paymentType
    })
}

export const getFullOrderByIdApi = (fullOrderId: number) => {
    return api.get(`/api/orders/fullOrder/${fullOrderId}`)
}

export const getFullOrdersForBuyer = () => {
    return api.get(`/api/orders/fullOrder`)
}

export const paymentByCardApi = (token: any, cartTotalPrice: number, shippingPrice: number) => {
    return api.post(`${baseURL}/api/payment/charge`, "", {
        headers: {
            token: token.id,
            amount: cartTotalPrice + shippingPrice,
        },
    })
}