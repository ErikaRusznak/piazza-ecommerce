"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from "components";
import { addFavorite, getFavorites, removeFavorite } from "../api/entities/BuyerApi";
import {ProductType} from "./CartContext";


interface FavoriteContextType {
    allFavorites: ProductType[];
    numberOfFavorites: number;
    addToFavorite: (productId: number) => void;
    removeFromFavorite: (productId: number) => void;
    checkIsFavorite: (favoritesArray: any[], id: number) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);
export const useFavorite = (): FavoriteContextType => {
    const context = useContext(FavoriteContext);
    if (!context) {
        throw new Error("useFavorite must be used within a FavoriteProvider");
    }
    return context;
};

const FavoriteProvider = ({ children } : { children: React.ReactNode}) => {
    const [allFavorites, setAllFavorites] = useState<ProductType[]>([]);
    const [numberOfFavorites, setNumberOfFavorites] = useState(0);
    const { isAuthenticated } = useAuth();

    const loadFavoriteItems = () => {
        if (isAuthenticated) {
            getFavorites()
                .then((res: { data: React.SetStateAction<any[]>; }) => {
                    setAllFavorites(res.data);
                    setNumberOfFavorites(res.data.length);
                })
                .catch((err: any) => console.error(err));
        }
    };

    const addToFavorite = (productId: number) => {
        addFavorite(productId)
            .then(() => {
                loadFavoriteItems();
            })
            .catch((err: any) => console.error(err));
    };

    const checkIsFavorite = (favoritesArray: any[], id: number) => {
        return favoritesArray.some((favorite) => favorite.id === id);
    };

    const removeFromFavorite = (productId: number) => {
        removeFavorite(productId)
            .then(() => {
                loadFavoriteItems();
            })
            .catch((err: any) => console.error(err));
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
