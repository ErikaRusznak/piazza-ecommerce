import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { getSellerByAliasApi } from "../../api/entities/SellerApi";
import { baseURL } from "../../api/ApiClient";
import { useAuth } from "../../api/auth/AuthContext";
import SellerDetailsComponent from "../moleculas/SellerDetailsComponent";
import SellerProductsPageComponent from "./admin/SellerProductsPageComponent";

const SellerPageComponent = () => {
    const { sellerAlias } = useParams();
    const [seller, setSeller] = useState(null);

    const { isAuthenticated, username, logout } = useAuth();

    const getSeller = (sellerAlias) => {
        getSellerByAliasApi(sellerAlias)
            .then((res) => {
                setSeller(res.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getSeller(sellerAlias);
    }, [sellerAlias]);

    return seller && (
        <div className="mx-auto mt-16 max-w-7xl px-10">
            <Link to="/sellers" className="text-md font-semibold leading-6 text-inherit dark:text-inherit">
                <span aria-hidden="true">&larr;</span> Back to sellers
            </Link>
            <div className="flex justify-center items-center gap-8 mt-4">
                <div className="items-center">
                    <div className="w-full md:max-w-3xl rounded overflow-hidden shadow-inner shadow-zinc-400">
                        <div className="grid grid-cols-3 sm:grid-cols-1 gap-6 p-6">
                            <div className="md:col-span-1 sm:col-span-full flex items-center justify-center">
                                <img
                                    src={`${baseURL}${seller.account.imageName}`}
                                    alt={seller.account.imageName}
                                    className="w-full max-w-sm md:max-w-md mx-auto md:mx-0"
                                />
                            </div>

                            <SellerDetailsComponent
                                seller={seller}
                                username={username}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-10 flex flex-col gap-2 p-5 text-zinc-800 border rounded-2xl border-indigo-300 shadow-md mt-10 mb-10">
                <div className="font-bold text-white text-2xl -mb-4">Products</div>
                    <SellerProductsPageComponent type="simplified"/>
            </div>
        </div>
    );
};

export default SellerPageComponent;
