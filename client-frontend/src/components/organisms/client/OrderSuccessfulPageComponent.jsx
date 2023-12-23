import BigContainer from "../../atoms/containers/BigContainer";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getFullOrderByIdApi} from "../../../api/entities/OrderApi";
import FullOrderInformation from "../../moleculas/FullOrderInformation";
import FullOrderItems from "../../moleculas/FullOrderItems";

function OrderSuccessfulPageComponent() {

    const {fullOrderId} = useParams();
    const [fullOrder, setFullOrder] = useState(null);

    const getFullOrder = (fullOrderId) => {
        getFullOrderByIdApi(fullOrderId)
            .then((res) => {
                setFullOrder(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getFullOrder(fullOrderId);
    }, []);


    const boxStyle = "flex border border-zinc-500 rounded-lg px-6 py-4 2xl:w-[30rem] xl:w-[30rem] lg:w-[25rem] md:w-[22rem]";


    return (
        fullOrder && (
        <BigContainer>
            <div className="mx-auto max-w-7xl  sm:w-full">
                <div className="w-full">

                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" strokeWidth="1"
                             stroke="currentColor" className="w-14 h-14">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>


                    <h1 className="flex justify-center text-3xl font-bold sm:text-2xl">
                        Thank you for your order!
                    </h1>

                    <div className="w-full mt-5 ">
                        <div
                            className="grid grid-areas-[left_right] sm:grid-areas-[top_bottom] grid-cols-2 sm:grid-cols-1 gap-4">

                            <div className="grid-in-[left] sm:grid-in-[top]">
                                <div className={boxStyle}>
                                    <FullOrderInformation
                                        orderNumber={fullOrder.orderNumber}
                                        date={fullOrder.publishDate}
                                        shippingAddress={fullOrder.shippingAddress}
                                        buyerEmail={fullOrder.buyerEmail}
                                    />
                                </div>
                            </div>

                            <div className="grid-in-[right] sm:grid-in-[bottom] ">
                                <div className={boxStyle}>
                                    <FullOrderItems
                                        orders={fullOrder.orders}
                                        totalPrice={fullOrder.totalPrice}
                                        shippingPrice={10}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </BigContainer>
        )
    )
}

export default OrderSuccessfulPageComponent