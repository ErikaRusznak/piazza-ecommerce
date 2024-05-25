import React, {useEffect, useState} from "react";
import { useAuth } from "components";
import {useFavorite} from "../../../contexts/FavoriteContext";
import {useAlert} from "../../../contexts/AlertContext";
import {Box, Button} from "@mui/material";
import {FavoriteBorderIcon, FavoriteIcon} from "@/components/atoms/icons";
import StyledButton from "@/components/atoms/StyledButton";

type AddRemoveWishListProps = {
    productId: number;
}
const AddRemoveWishlist = ({productId}: AddRemoveWishListProps) => {

    const {allFavorites, addToFavorite, removeFromFavorite, checkIsFavorite} = useFavorite();
    const [isFavorite, setIsFavorite] = useState(false);
    // const {pushAlert, clearAlert} = useAlert()

    useEffect(() => {
        setIsFavorite(checkIsFavorite(allFavorites, productId));
    }, [allFavorites]);

    const toggleFavorite = () => {
        if (!isFavorite) {
            addToFavorite(productId);
            // pushAlert({
            //     type: "info",
            //     title: "Product Added To Wishlist"
            // })
            // setTimeout(() => {
            //     clearAlert();
            // }, 2000)
        } else {
            removeFromFavorite(productId);
            // pushAlert({
            //     type: "info",
            //     title: "Product Removed From Wishlist"
            // })
            // setTimeout(() => {
            //     clearAlert();
            // }, 2000)
        }
    };
    return (
        <StyledButton
            variant="contained"
            onClick={toggleFavorite}>
            <Box sx={{display: "flex", flexDirection: "row", gap: 1}}>
                <Box>
                    {isFavorite ? (
                        "Remove from wishlist"
                    ) : (
                        "Add to wishlist"
                    )}
                </Box>
                {isFavorite ? (
                    <FavoriteIcon/>
                ) : (
                    <FavoriteBorderIcon/>
                )}
            </Box>
        </StyledButton>
    );
};

export default AddRemoveWishlist;