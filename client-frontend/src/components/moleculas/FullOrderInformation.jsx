import React, {useEffect, useState} from "react";
import {getBuyerByEmailApi} from "../../api/entities/BuyerApi";

const FullOrderInformation = ({orderNumber, date, shippingAddress, buyerEmail}) => {

    const [buyer, setBuyer] = useState(null);

    const getBuyerDetails = (buyerEmail) => {
        getBuyerByEmailApi(buyerEmail)
            .then((res) => {
                setBuyer(res.data);
            })
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        getBuyerDetails(buyerEmail);
    }, []);

    return (
    buyer && (
        <div className="flex flex-col flex-start">
            <div className="text-xl font-bold mb-3">
                Order Information
            </div>
            <div className="flex flex-col">
                <div className="mb-1 text-lg">
                    Order number: #{orderNumber}
                </div>
                <div className="mb-3 text-lg">
                    Date: {date}
                </div>
            </div>
            <hr className="w-full"/>

            <div className="text-xl font-bold mt-4 mb-3">
                Shipping Address
            </div>
            <div className="flex flex-col">
                <div className="mb-1 text-lg">
                    {shippingAddress.addressLine1},{" "}
                    {shippingAddress.addressLine2},{" "}
                    {shippingAddress.zipCode}
                </div>
                <div className="mb-3 text-lg">
                    {shippingAddress.city},{" "}
                    {shippingAddress.state},{" "}
                    {shippingAddress.country}
                </div>
            </div>
            <hr/>

            <div className="text-xl font-bold mt-4 mb-3">
                Buyer Info
            </div>
            <div className="flex flex-col">
                <div className="mb-1 text-lg">
                    {buyer.firstName}{" "}{buyer.lastName}
                </div>
                <div className="mb-1 text-lg">
                    {buyerEmail}
                </div>
                <div className="mb-3 text-lg">
                    {buyer.telephone}
                </div>
            </div>

        </div>
    )
    )
}

export default FullOrderInformation;