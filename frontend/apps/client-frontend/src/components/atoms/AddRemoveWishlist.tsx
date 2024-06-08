import React, {useEffect, useState} from "react";
import { Box } from "@mui/material";
import { useFavorite } from "../../../contexts/FavoriteContext";
import { useAlert } from "components";
import { FavoriteBorderIcon, FavoriteIcon } from "@/components/atoms/icons";
import { StyledButton } from "ui";

type AddRemoveWishListProps = {
    productId: number;
};

const AddRemoveWishlist = ({ productId }: AddRemoveWishListProps) => {
    const { allFavorites, addToFavorite, removeFromFavorite, checkIsFavorite } = useFavorite();
    const [isFavorite, setIsFavorite] = useState(false);
    const { pushAlert } = useAlert();

    useEffect(() => {
        setIsFavorite(checkIsFavorite(allFavorites, productId));
    }, [allFavorites]);

    const toggleFavorite = () => {
        if (!isFavorite) {
            addToFavorite(productId);
            pushAlert({
                type: "info",
                title: "Product Added To Wishlist",
                paragraph: "This product has been added to your wishlist."
            });
        } else {
            removeFromFavorite(productId);
            pushAlert({
                type: "info",
                title: "Product Removed From Wishlist",
                paragraph: "This product has been removed from your wishlist."
            });
        }
    };

    return (
        <StyledButton
            variant="contained"
            onClick={toggleFavorite}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                <Box>
                    {isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                </Box>
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Box>
        </StyledButton>
    );
};

export default AddRemoveWishlist;
