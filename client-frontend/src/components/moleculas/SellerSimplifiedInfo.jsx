import React from "react";
import { baseURL } from "../../api/ApiClient";
import {useNavigate} from "react-router-dom";

const SellerSimplifiedInfo = ({ seller }) => {

    const navigate = useNavigate();

    return (
        <div className="w-full transition-transform transform hover:scale-105">
            <div className="flex sm:flex-col items-start flex-row sm:items-center m-4">
                <img
                    src={`${baseURL}${seller.account.imageName}`}
                    alt={seller.account.imageName}
                    onClick={() => navigate(`/${seller.alias}`)}
                    className="w-44 h-44 object-cover rounded-lg m-4 cursor-pointer"
                />
                <div className="sm:text-center text-left pl-6">
                    <div>
                        <div className="font-bold text-3xl sm:text-2xl mb-1 cursor-pointer hover:underline"
                             onClick={() => navigate(`/${seller.alias}`)}>
                            {seller.alias}
                        </div>
                        <div className="font-bold text-md sm:text-md mb-3">{seller.sellerType}</div>
                    </div>
                    <div className="text-sm">
                        <div>{`${seller.addressLine1}, ${seller.addressLine2}`}</div>
                        <div>{`${seller.city}, ${seller.state}, ${seller.country}`}</div>
                        <div className="mt-1">{seller.account.email}</div>
                        <div>{seller.account.telephone}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerSimplifiedInfo;
