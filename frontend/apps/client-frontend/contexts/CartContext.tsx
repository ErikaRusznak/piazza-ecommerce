"use client"
import {createContext, useContext, useEffect, useState} from 'react';
import { useAuth } from "components";
import { addOrUpdateCartItem, removeCartItem, getCartItems } from "../api/entities/CartApi";

interface CartContextType {
    allCartItems: any[] | null;
    numberOfCartItems: number;
    cartTotalPrice: number;
    updateCartItemQuantity: (productId: number, newQuantity: number) => void;
    deleteCartItem: (productId: string) => void;
    refreshCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if(!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}

const CartProvider = ({ children }: any) => {
    const [allCartItems, setAllCartItems] = useState<any[] | null>(null);
    const [numberOfCartItems, setNumberOfCartItems] = useState<number>(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    const { isAuthenticated, username } = useAuth();

    function loadCartItems() {
        if (isAuthenticated) {
            getCartItems()
                .then((response) => {
                    setAllCartItems(response.data.cartItems);
                    setNumberOfCartItems(response.data.cartItems.length);
                    setCartTotalPrice(response.data.totalCartPrice);
                })
                .catch((err) => {
                    console.log(err);
                    setAllCartItems([]);
                });
        } else {
            setAllCartItems(null);
            setNumberOfCartItems(0);
            setCartTotalPrice(0);
        }
    }

    function updateCartItemQuantity(productId: number, newQuantity: number) {
        addOrUpdateCartItem(productId, newQuantity)
            .then(() => {
                refreshCart();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function deleteCartItem(productId: string) {
        removeCartItem(productId)
            .then(() => {
                refreshCart();
            })
            .catch((err) => console.log(err));
    }

    function refreshCart() {
        loadCartItems();
    }

    useEffect(() => {
        refreshCart();
    }, [isAuthenticated, username]);

    useEffect(() => {
        if (allCartItems !== null) {
            setNumberOfCartItems(allCartItems.length);
        }
    }, [allCartItems]);


    return (
        <CartContext.Provider value={{ allCartItems, numberOfCartItems, cartTotalPrice, updateCartItemQuantity, deleteCartItem, refreshCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
