import {api, baseURL} from "components";
import {ShippingAddressType} from "@/app/checkout/page";

export const submitOrder = (
    shippingAddress: ShippingAddressType,
    products: {
        quantity: any;
        productId: any }[] | undefined,
    email: string,
    paymentType: string) => {
    return api.post('/orders', {
        shippingAddress: shippingAddress,
        products: products,
        email: email,
        paymentType: paymentType
    })
}

export const getFullOrderByIdApi = (fullOrderId: number) => {
    return api.get(`/fullOrder/${fullOrderId}`)
}

export const getFullOrdersForBuyer = () => {
    return api.get(`fullOrder`)
}

export const paymentByCardApi = (token: any, cartTotalPrice: number, shippingPrice: number) => {
    return api.post(`${baseURL}/payment/charge`, "", {
        headers: {
            token: token.id,
            amount: cartTotalPrice + shippingPrice,
        },
    })
}