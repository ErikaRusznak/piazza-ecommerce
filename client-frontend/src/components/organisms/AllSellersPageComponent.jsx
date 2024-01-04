import React, {useEffect, useState} from "react";
import {getAllSellersApi} from "../../api/entities/SellerApi";
import SellerSimplifiedInfo from "../moleculas/SellerSimplifiedInfo";

const AllSellersPageComponent = () => {
    const [sellers, setSellers] = useState([]);

    const getAllSellers = () => {
        getAllSellersApi()
            .then((res) => {
                setSellers(res.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getAllSellers();
    }, []);

    return (
        <div className="mx-auto mt-16 max-w-7xl px-10">
            {sellers && (
                <div>
                    <header>
                        <h2 className="text-3xl mb-10 font-bold text-zinc-800 dark:text-white">
                            Available sellers
                        </h2>
                    </header>
                    <div className="flex flex-col justify-center items-center gap-10">
                        {sellers.map((seller) => (
                            <div className="w-full rounded overflow-hidden shadow-lg shadow-zinc-600" key={seller.id}>
                                    <SellerSimplifiedInfo seller={seller} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {!sellers && <p>Loading page...</p>}
        </div>
    );
};

export default AllSellersPageComponent;
