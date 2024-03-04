import {api} from "../ApiClient";
import {ShippingAddressType} from "@/app/checkout/page";

export const submitOrder = (shippingAddress: ShippingAddressType, products: {
    quantity: any;
    productId: any
}[] | undefined, email: string) => {
    return api.post('/order', {
        shippingAddress: shippingAddress,
        products: products,
        email: email
    })
}

export const getFullOrderByIdApi = (fullOrderId: number) => {
    return api.get(`/fullOrder/${fullOrderId}`)
}
