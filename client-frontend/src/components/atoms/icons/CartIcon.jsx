import React from "react";
import {ShoppingBagIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {useCart} from "../../../contexts/CartContext";

const CartIcon = () => {
    const { numberOfCartItems } = useCart()

    return (
        <Link to='/account/cart' className="relative mr-6">
            <ShoppingBagIcon className="h-6 w-6 text-gray-900 dark:text-inherit"/>
            {numberOfCartItems!==0 &&
                <div className="absolute
                                 inline-flex items-center justify-center
                                 w-4 h-4
                                 text-xxs font-bold text-white bg-red-500 border-0 border-white rounded-full
                                 -top-2 -right-2
                                 dark:border-gray-900">
                    {numberOfCartItems}
                </div>
            }
        </Link>
    )
}

export default CartIcon;