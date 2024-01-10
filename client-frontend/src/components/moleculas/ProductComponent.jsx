import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {baseURL} from "../../api/ApiClient";
import {useAuth} from "../../api/auth/AuthContext";
import {useFavorite} from "../../contexts/FavoriteContext";
import {deleteProductByIdApi} from "../../api/entities/ProductApi";

const ProductComponent = ({id, name, imageName, price, sellerAlias, rating, toggleModal, sellerEmail, toggleDeleteModal}) => {
    const navigate = useNavigate();
    const {isAuthenticated, username} = useAuth();
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
                        ) : (
                            <div>
                                {(userRole==="ADMIN" && username===sellerEmail) && (
                                    <div className="flex gap-2">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"
                                                 className="w-6 h-6 cursor-pointer"
                                            onClick={() => navigate(`/editProduct/${id}`)}>
                                                <path
                                                    d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"/>
                                                <path
                                                    d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"/>
                                            </svg>

                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red"
                                                 className="w-6 h-6 cursor-pointer"
                                                    onClick={() => {
                                                        toggleDeleteModal(id);
                                                    }}>
                                                <path fillRule="evenodd"
                                                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                                      clipRule="evenodd"/>
                                            </svg>

                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
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