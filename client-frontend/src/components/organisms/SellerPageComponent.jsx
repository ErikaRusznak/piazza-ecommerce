import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getSellerByAliasApi} from "../../api/entities/SellerApi";
import {baseURL} from '../../api/ApiClient';

const SellerPageComponent = () => {

    const {sellerAlias} = useParams();
    const [seller, setSeller] = useState(null);

    const getSeller = (sellerAlias) => {
        getSellerByAliasApi(sellerAlias)
            .then((res) => {
                setSeller(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getSeller(sellerAlias);
    }, []);

    console.log(seller);

    return seller && (
        <div className="mx-auto mt-16 max-w-7xl px-10">
            <div className={`flex justify-center items-center gap-8`}>

                <div className="items-center">
                    {/*important details - for all*/}
                    {/*alias, strada, oras, region, country, nume de tel, seller type, image*/}
                    <div className="w-full  md:max-w-sm sm:max-w-sm rounded overflow-hidden shadow-lg shadow-zinc-500">

                        <div className="flex flex-row md:flex-col sm:flex-col w-full h-full px-6 py-4 lg:gap-8 xl:gap-8 2xl:gap-8">
                            <div>
                                <img src={`${baseURL}${seller.account.imageName}`}
                                     alt={seller.account.imageName}
                                     className="w-[12rem]"/>
                            </div>

                            <div className=" py-4 lg:hidden xl:hidden 2xl:hidden">
                                <div className="font-bold text-xl mb-2">{seller.alias}</div>
                                <div className="font-bold text-lg mb-1">{seller.sellerType}</div>
                            </div>

                            <div>
                                <div className="font-bold text-lg mb-2">
                                    Contact details
                                </div>
                                <div>
                                    Strada: Vasile Lucaciu 6/8
                                </div>
                                <div>
                                    Bloc 2, nr 6
                                </div>
                                <div>
                                    Oras: Baia Mare
                                </div>
                                <div>
                                    region: Maramures
                                </div>
                                <div>
                                    Country: Romania
                                </div>
                                <div>
                                    Zipcode: 300102
                                </div>
                            </div>

                            <div>
                                <div className="font-bold text-lg mb-2">
                                    Account details
                                </div>
                                {/*hidden for users that are not the seller*/}
                                <div>
                                    First name: Alex
                                </div>
                                {/*hidden for users that are not the seller*/}
                                <div>
                                    Last name: Dulfu
                                </div>
                                <div>
                                    email: alex.dulfu@gmail.com
                                </div>
                                <div>
                                    Telephone: 0747871208
                                </div>
                            </div>

                            <div>
                                <div className="font-bold text-lg mb-2">
                                    Legal details
                                </div>
                                <div>
                                    Company name: COMPANY
                                </div>
                                <div>
                                    CUI: 1205988456
                                </div>
                                <div>
                                    Company Type: SELLER
                                </div>
                                <div>
                                    Date of registration: 2023-10-12
                                </div>
                            </div>
                        </div>

                        <div className="pl-6 py-2 md:hidden sm:hidden">
                            <div className="font-bold text-xl mb-2">{seller.alias}</div>
                            <div className="font-semibold text-md mb-1">{seller.sellerType}</div>
                        </div>
                    </div>


                </div>
            </div>

            <div className="px-10 flex flex-col gap-2 p-5 text-zinc-800 border rounded-2xl border-indigo-300 shadow-md mt-10 mb-10">
                <div className="font-bold text-white">
                    Products
                </div>
            </div>

        </div>


    )
}

export default SellerPageComponent;