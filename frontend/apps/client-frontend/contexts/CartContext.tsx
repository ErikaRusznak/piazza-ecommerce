"use client"
import {createContext, useContext, useEffect, useState} from 'react';
import {useAuth} from "components";
import { addOrUpdateCartItem, removeCartItem, getCartItems } from "../api/entities/CartApi";

export type SellerType = {
    account: AccountType;
    addressLine1: string;
    addressLine2: string;
    alias: string;
    city: string;
    companyName: string | null;
    companyType: string | null;
    country: string;
    cui: string | null;
    dateOfRegistration: string | null;
    id: number;
    numericCodeByState: number;
    sellerType: string;
    serialNumber: number;
    state: string;
    zipCode: string;
};

export type CategoryType = {
    id: number;
    name: string;
};

export type AccountType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    imageName: string | null;
    password: string;
    telephone: string;
    userRole: string;
};

export type ProductType = {
    id: number;
    availability: string;
    category: CategoryType;
    description: string;
    imageName: string | null;
    name: string;
    numberReviews: number;
    price: number;
    productRating: number;
    quantity: number;
    ratingApplicable: boolean;
    seller: SellerType;
    unitOfMeasure: string;
}

export type CartItemType = {
    id: number;
    product: ProductType;
    quantity: number;
}

interface CartContextType {
    allCartItems: CartItemType[] | null;
    numberOfCartItems: number;
    cartTotalPrice: number;
    updateCartItemQuantity: (productId: number, newQuantity: number) => void;
    deleteCartItem: (productId: number) => void;
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

const CartProvider = ({ children }: {children: React.ReactNode}) => {
    const [allCartItems, setAllCartItems] = useState<CartItemType[] | null>(null);
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
                    console.error(err);
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
                console.error(err);
            });
    }

    function deleteCartItem(productId: number) {
        removeCartItem(productId)
            .then(() => {
                refreshCart();
            })
            .catch((err) => console.error(err));
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
