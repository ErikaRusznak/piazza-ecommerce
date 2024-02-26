import React, {useEffect, useState} from "react";
import {useAuth} from "../../../api/auth/AuthContext";
import {useFavorite} from "../../../contexts/FavoriteContext";
import {useAlert} from "../../../contexts/AlertContext";
import {Box, Button} from "@mui/material";
import {FavoriteBorderIcon, FavoriteIcon} from "@/components/atoms/icons";

type AddRemoveWishListProps = {
    productId: number;
}
const AddRemoveWishlist = ({productId} : AddRemoveWishListProps) => {

    const {isAuthenticated} = useAuth();

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
        isAuthenticated && (
            <Button
                sx={{display: "flex", justifyContent: "center", }}
                onClick={toggleFavorite}>
                <Box className="flex">
                    <Box sx={{mt: "3px"}}>
                        {isFavorite ? (
                            "Remove from wishlist"
                        ) : (
                            "Add to wishlist"
                        )}
                    </Box>
                    <Box>
                        {isFavorite ? (
                            <FavoriteIcon />
                        ) : (
                            <FavoriteBorderIcon />
                        )}
                    </Box>
                </Box>
            </Button>
        )
    );
};

export default AddRemoveWishlist;