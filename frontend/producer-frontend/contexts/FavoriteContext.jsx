import React, {createContext, useContext, useEffect, useState} from 'react'
import {addFavorite, getFavorites, removeFavorite} from "../client-frontend/api/entities/BuyerApi";
import {useAuth} from "../client-frontend/api/auth/AuthContext";

const FavoriteContext = createContext(undefined)
export const useFavorite = () => useContext(FavoriteContext)

const FavoriteProvider = ({children}) => {

    const [allFavorites, setAllFavorites] = useState([]);
    const [numberOfFavorites, setNumberOfFavorites] = useState(0);
    const {isAuthenticated} = useAuth()
    const userRole = sessionStorage.getItem("userStatus");

    const loadFavoriteItems = () => {
        if (!!isAuthenticated && userRole === "CLIENT") {
            getFavorites()
                .then((res) => {
                    setAllFavorites(res.data)
                    setNumberOfFavorites(res.data.length)
                })
                .catch((err) => console.log(err));
        }
    }

    const addToFavorite = (productId) => {
        addFavorite(productId)
            .then(() => {
                loadFavoriteItems();
            })
            .catch((err) => console.log(err));
    }

    const checkIsFavorite = (favoritesArray, id) => {
        return favoritesArray.some((favorite) => favorite.id === id);
    };

    const removeFromFavorite = (productId) => {
        removeFavorite(productId)
            .then(() => {
                loadFavoriteItems();
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadFavoriteItems();
    }, [isAuthenticated]);


    return (
        <FavoriteContext.Provider value={{allFavorites, numberOfFavorites, addToFavorite, removeFromFavorite, checkIsFavorite}}>
            {children}
        </FavoriteContext.Provider>
    )
}

export default FavoriteProvider;
