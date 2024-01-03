import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSellerByAliasApi } from "../../api/entities/SellerApi";
import { baseURL } from "../../api/ApiClient";
import { useAuth } from "../../api/auth/AuthContext";

const SellerPageComponent = () => {
    const { sellerAlias } = useParams();
    const [seller, setSeller] = useState(null);

    const { isAuthenticated, username, logout } = useAuth();
    const userRole = sessionStorage.getItem("userStatus");

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
            <div className="flex justify-center items-center gap-8">
                <div className="items-center">
                    <div className="w-full md:max-w-3xl rounded overflow-hidden shadow-lg shadow-zinc-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 gap-6 p-6">
                            <div className="md:col-span-1 sm:col-span-full">
                                <img
                                    src={`${baseURL}${seller.account.imageName}`}
                                    alt={seller.account.imageName}
                                    className="w-full max-w-sm md:max-w-md mx-auto md:mx-0 "
                                />
                            </div>

                            <div className="md:col-span-2 sm:col-span-full">
                                <div className="hidden md:block sm:block mb-6">
                                    <div className="font-bold text-3xl mb-2">{seller.alias}</div>
                                    <div className="font-bold text-xl mb-2">{seller.sellerType}</div>
                                </div>

                                <div className="md:ml-6 sm:ml-0">
                                    <div className="font-bold text-lg mb-2">Contact details</div>
                                    <div>Strada: Vasile Lucaciu 6/8</div>
                                    <div>Bloc 2, nr 6</div>
                                    <div>Oras: Baia Mare</div>
                                    <div>Region: Maramures</div>
                                    <div>Country: Romania</div>
                                    <div>Zipcode: 300102</div>
                                    <hr className="my-3" />

                                    <div className="font-bold text-lg mb-2">Account details</div>
                                    <div>First name: Alex</div>
                                    <div>Last name: Dulfu</div>
                                    <div>Email: alex.dulfu@gmail.com</div>
                                    <div>Telephone: 0747871208</div>
                                    <hr className="my-3" />

                                    <div className="font-bold text-lg mb-2">Legal details</div>
                                    <div>Company name: COMPANY</div>
                                    <div>CUI: 1205988456</div>
                                    <div>Company Type: SELLER</div>
                                    <div>Date of registration: 2023-10-12</div>
                                </div>
                            </div>

                            <div className="md:hidden sm:hidden text-center">
                                <div className="font-bold text-3xl mb-2">{seller.alias}</div>
                                <div className="font-bold text-xl mb-2">{seller.sellerType}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-10 flex flex-col gap-2 p-5 text-zinc-800 border rounded-2xl border-indigo-300 shadow-md mt-10 mb-10">
                <div className="font-bold text-white text-2xl">Products</div>
                {/* Add your product list component or content here */}
            </div>
        </div>
    );
};

export default SellerPageComponent;
