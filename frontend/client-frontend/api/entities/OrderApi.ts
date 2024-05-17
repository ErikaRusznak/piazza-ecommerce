import {api} from "../ApiClient";
import {ShippingAddressType} from "@/app/checkout/page";
import axios from "axios";

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
