import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {baseURL} from "../../api/ApiClient";
import {useAuth} from "../../api/auth/AuthContext";
import {useFavorite} from "../../contexts/FavoriteContext";

const ProductComponent = ({id, name, imageName, price, sellerAlias, rating, toggleModal}) => {
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth();
    const userRole = sessionStorage.getItem("userStatus")
    const {allFavorites, addToFavorite, removeFromFavorite, checkIsFavorite} = useFavorite();

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(checkIsFavorite(allFavorites, id));
    }, [allFavorites]);


    const toggleFavorite = () => {
        if (!isFavorite) {
            addToFavorite(id);
        } else {
            removeFromFavorite(id);
        }
    };

    const textFavoriteToDisplay = isFavorite ? "Remove from favorites" : "Add to favorites";

    return (
        <div className="flex flex-col h-full w-full max-w-[280px] mx-auto">
            <div
                className="group bg-white dark:bg-[#1a2747] border border-zinc-300 rounded-xl w-full flex flex-col justify-between dark:border dark:border-[#312e81] shadow-md p-4"
            >
                <div className="flex items-center justify-center mb-4 overflow-hidden">
                    <img
                        src={`${baseURL}${imageName}`}
                        alt={name}
                        onClick={() => navigate(`/${sellerAlias}/products/${id}`)}
                        className="object-cover w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto rounded-md cursor-pointer"
                    />

                </div>

                <div className="dark:bg-[#1a2747] flex justify-between">
                    <div>
                        <h3
                            className="font-bold text-xl text-zinc-800 cursor-pointer group-hover:underline group-hover:underline-offset-4 dark:text-white mb-2"
                            onClick={() => navigate(`/${sellerAlias}/products/${id}`)}
                        >
                            {name}
                        </h3>
                        <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-2">{price} RON</p>
                    </div>
                    <div>
                        {!isAuthenticated || (isAuthenticated && userRole === 'CLIENT') ? (
                            <button
                                type="button"
                                className="text-lg items-center w-10 h-10 rounded-[20px] text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-lg shadow-indigo-500/50 dark:shadow-lg dark:shadow-indigo-800/80 font-medium px-3 py-1.5 text-center  mb-2"
                                onClick={() => {
                                    toggleModal(id);
                                }}>
                                +
                            </button>
                        ) : null}
                    </div>
                </div>

                {isAuthenticated && userRole === 'CLIENT' && (
                    <div className="flex items-center justify-center">
                        <button
                            className="text-lg py-1 w-full text-center rounded-full text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-md"
                            onClick={toggleFavorite}>
                            {textFavoriteToDisplay}
                        </button>
                    </div>
                )}

            </div>
        </div>
    );

}
export default ProductComponent;