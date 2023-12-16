import React from "react";
import {baseURL} from "../../api/ApiClient";

const FullOrderItems = ({orders, totalPrice, shippingPrice}) => {

    const fixedTotalPrice = parseFloat(totalPrice.toFixed(2));
    const finalPrice = fixedTotalPrice + shippingPrice;

    return (
        (orders && totalPrice) && (
            <div className="w-full">
                <div className="text-xl font-bold mb-3">
                    Ordered Items
                </div>

                {orders.map((orderFromSeller) => (
                    <div key={orderFromSeller.id}>
                        {orderFromSeller.orderItems.map((orderItem) => (
                            <div key={orderItem.id}>
                                <div className="flex justify-between mt-2 mb-2">

                                    <div className="flex flex-row">

                                        <img
                                            src={`${baseURL}${orderItem.product.imageName}`}
                                            alt={orderItem.product.name}
                                            className="w-[5rem] "/>

                                        <div className="ml-4">
                                            <div className="font-bold text-lg">
                                                {orderItem.product.name}
                                            </div>
                                            <div className="text-[15px]">
                                                {orderItem.product.seller.alias}
                                            </div>
                                            <div className="text-[15px]">
                                                x {orderItem.quantity}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {orderItem.product.price * orderItem.quantity} RON
                                    </div>
                                </div>
                                <hr/>
                            </div>
                        ))}
                    </div>
                ))}


                <div className="flex justify-between mt-2">
                    <div>
                        Subtotal
                    </div>
                    <div>
                        {fixedTotalPrice} RON
                    </div>
                </div>

                <div className="flex justify-between mt-2">
                    <div>
                        Shipping payment
                    </div>
                    <div>
                        {shippingPrice} RON
                    </div>
                </div>

                <div className="flex justify-between mt-2">
                    <div className="font-bold text-xl">
                        Total
                    </div>
                    <div className="font-bold text-xl">
                        {finalPrice} RON
                    </div>
                </div>
            </div>

        ))
}

export default FullOrderItems;