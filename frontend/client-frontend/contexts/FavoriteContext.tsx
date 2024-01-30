"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import {useAuth} from "../api/auth/AuthContext";
import {addFavorite, getFavorites, removeFavorite} from "../api/entities/BuyerApi";

interface FavoriteContextType {
    allFavorites: any[];
    numberOfFavorites: number;
    addToFavorite: (productId: string) => void;
    removeFromFavorite: (productId: string) => void;
    checkIsFavorite: (favoritesArray: any[], id: string) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);
export const useFavorite = () => useContext(FavoriteContext);

const FavoriteProvider = ({ children }: any) => {
    const [allFavorites, setAllFavorites] = useState<any[]>([]); // Adjust the type accordingly
    const [numberOfFavorites, setNumberOfFavorites] = useState(0);
    const { isAuthenticated } = useAuth();
    const userRole = sessionStorage.getItem("userStatus");

    const loadFavoriteItems = () => {
        if (!!isAuthenticated && userRole === "CLIENT") {
            getFavorites()
                .then((res: { data: React.SetStateAction<any[]>; }) => {
                    setAllFavorites(res.data);
                    setNumberOfFavorites(res.data.length);
                })
                .catch((err: any) => console.log(err));
        }
    };

    const addToFavorite = (productId: string) => {
        addFavorite(productId)
            .then(() => {
                loadFavoriteItems();
            })
            .catch((err: any) => console.log(err));
    };

    const checkIsFavorite = (favoritesArray: any[], id: string) => {
        return favoritesArray.some((favorite) => favorite.id === id);
    };

    const removeFromFavorite = (productId: string) => {
        removeFavorite(productId)
            .then(() => {
                loadFavoriteItems();
            })
            .catch((err: any) => console.log(err));
    };

    useEffect(() => {
        loadFavoriteItems();
    }, [isAuthenticated]);

    return (
        <FavoriteContext.Provider value={{ allFavorites, numberOfFavorites, addToFavorite, removeFromFavorite, checkIsFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export default FavoriteProvider;
