import React from "react";
import {styled} from "@mui/material/styles";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import themes from "@/theme/themes";
import CustomizedBadges from "@/components/atoms/icons/styledIcons/CustomizedBadges";
import {useFavorite} from "../../../../../contexts/FavoriteContext";

const StyledFavoriteIcon = styled(FavoriteBorderIcon)(({theme}) => ({
    fontSize: 24,
    color: themes().palette.info.main,
}));

const FavoriteIcon = () => {

    // @ts-ignore
    const {numberOfFavorites} = useFavorite();

    return (
        numberOfFavorites ? (
            <CustomizedBadges badgeContent={numberOfFavorites}>
                <StyledFavoriteIcon />
            </CustomizedBadges>
        ) : (
            <StyledFavoriteIcon />
        )
    );
};

export default FavoriteIcon;