import React from "react";
import {styled} from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import themes from "@/theme/themes";
import CustomizedBadges from "@/components/atoms/icons/styledIcons/CustomizedBadges";
import {useCart} from "../../../../../contexts/CartContext";

const StyledShoppingIcon = styled(ShoppingCartIcon)(({theme}) => ({
    fontSize: 24,
    color: themes().palette.info.main,
}));

const CartIcon = () => {
    // @ts-ignore
    const { numberOfCartItems } = useCart();

    return (
        numberOfCartItems ? (
            <CustomizedBadges badgeContent={numberOfCartItems}>
                <StyledShoppingIcon />
            </CustomizedBadges>
        ) : (
            <StyledShoppingIcon />
        )
    );
};

export default CartIcon;