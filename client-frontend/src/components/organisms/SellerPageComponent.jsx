import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { getSellerByAliasApi } from "../../api/entities/SellerApi";
import { baseURL } from "../../api/ApiClient";
import { useAuth } from "../../api/auth/AuthContext";
import SellerDetailsComponent from "../moleculas/SellerDetailsComponent";
import SellerProductsPageComponent from "./admin/SellerProductsPageComponent";

const SellerPageComponent = () => {

    const navigate = useNavigate();

    const { sellerAlias } = useParams();
    const [seller, setSeller] = useState(null);
    const userRole = sessionStorage.getItem("userStatus");

    const { username } = useAuth();

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
        <div className="mx-auto mt-16 max-w-7xl sm:mt-4 px-10">
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
                <div className="flex flex-row items-center -mb-4">
                <div className="font-bold text-white text-xl ">Products</div>
                    {(userRole==="ADMIN" && username===seller.account.email) && (
                        <div className="font-bold text-white ml-5 cursor-pointer"
                             onClick={()=>navigate('/createProduct')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6 text-indigo-500">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>


                        </div>
                    )}
                </div>
                    <SellerProductsPageComponent type="simplified"/>
            </div>
        </div>
    );
};

export default SellerPageComponent;
