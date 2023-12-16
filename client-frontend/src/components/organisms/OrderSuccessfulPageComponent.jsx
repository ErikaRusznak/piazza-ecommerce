import BigContainer from "../atoms/containers/BigContainer";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getFullOrderByIdApi} from "../../api/entities/OrderApi";
import {baseURL} from "../../api/ApiClient";

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

    console.log(fullOrder)

    const boxStyle = "flex border border-zinc-500 rounded-lg px-6 py-4 2xl:w-[30rem] xl:w-[30rem] lg:w-[25rem] md:w-[22rem]";

    const picName = "/images/apple.jpg";
    return (
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
                                    <div className="flex flex-col flex-start">
                                        <div className="text-xl font-bold mb-3">
                                            Order Information
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="mb-1 text-lg">
                                                Order number: #943120
                                            </div>
                                            <div className="mb-3 text-lg">
                                                Date: January 23, 2022
                                            </div>
                                        </div>
                                        <hr className="w-full"/>

                                        <div className="text-xl font-bold mt-4 mb-3">
                                            Shipping Address
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="mb-1 text-lg">
                                                Aleea Minis,
                                                sc 2B,
                                                300999
                                            </div>
                                            <div className="mb-3 text-lg">
                                                Timisoara,
                                                Timis,
                                                Romania
                                            </div>
                                        </div>
                                        <hr/>

                                        <div className="text-xl font-bold mt-4 mb-3">
                                            Buyer Info
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="mb-1 text-lg">
                                                Erika Rusznak
                                            </div>
                                            <div className="mb-1 text-lg">
                                                erika.rusznak@gmail.com
                                            </div>
                                            <div className="mb-3 text-lg">
                                                +40747871208
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="grid-in-[right] sm:grid-in-[bottom] ">
                                <div className={boxStyle}>
                                    <div className="w-full">
                                        <div className="flex justify-between mb-2">

                                            <div className="flex flex-row">
                                                <div>
                                                    <img
                                                        src={`${baseURL}${picName}`}
                                                        alt={"picName"}
                                                        className="w-[5rem] "/>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-bold text-xl">
                                                        Apple
                                                    </div>
                                                    <div>
                                                        Mega seller
                                                    </div>
                                                    <div>
                                                        x 2
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                24.7 RON
                                            </div>
                                        </div>

                                        <hr/>
                                        <div className="flex justify-between mt-2 mb-2">
                                            <div className="flex flex-row">
                                                <div>
                                                    <img
                                                        src={`${baseURL}${picName}`}
                                                        alt={"picName"}
                                                        className="w-[5rem] "/>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-bold text-xl">
                                                        Apple
                                                    </div>
                                                    <div>
                                                        Mega seller
                                                    </div>
                                                    <div>
                                                        x 2
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                24.7 RON
                                            </div>
                                        </div>

                                        <hr/>
                                        <div className="flex justify-between mt-2 mb-2">
                                            <div className="flex flex-row">
                                                <div>
                                                    <img
                                                        src={`${baseURL}${picName}`}
                                                        alt={"picName"}
                                                        className="w-[5rem] "/>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-bold text-xl">
                                                        Apple
                                                    </div>
                                                    <div>
                                                        Mega seller
                                                    </div>
                                                    <div>
                                                        x 2
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                24.7 RON
                                            </div>
                                        </div>
                                        <hr/>

                                        <div className="flex justify-between mt-2 mb-2">
                                            <div className="flex flex-row">
                                                <div>
                                                    <img
                                                        src={`${baseURL}${picName}`}
                                                        alt={"picName"}
                                                        className="w-[5rem] "/>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-bold text-xl">
                                                        Apple
                                                    </div>
                                                    <div>
                                                        Mega seller
                                                    </div>
                                                    <div>
                                                        x 2
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                24.7 RON
                                            </div>
                                        </div>
                                        <hr/>

                                        <div className="flex justify-between mt-2">
                                            <div>
                                                Subtotal
                                            </div>
                                            <div>
                                                61 RON
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-2">
                                            <div>
                                                Shipping payment
                                            </div>
                                            <div>
                                                10 RON
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-2">
                                            <div className="font-bold text-xl">
                                                Total
                                            </div>
                                            <div className="font-bold text-xl">
                                                71 RON
                                            </div>
                                        </div>

                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </BigContainer>
    )
}

export default OrderSuccessfulPageComponent