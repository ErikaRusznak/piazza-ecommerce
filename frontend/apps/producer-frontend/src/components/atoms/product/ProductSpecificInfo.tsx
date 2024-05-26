import React from "react";
import {useTheme} from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import {Box, Typography} from "@mui/material";

type ProductSpecificInfoProps = {
    label: "Price" | "Category" | "Rating" | "No. reviews" | "No. remaining items";
    information: string;
    rating?: number;
}

const ProductSpecificInfo = ({label, information, rating} : ProductSpecificInfoProps) => {

    const theme = useTheme();

    const ratingColor = () => {
        if(rating) {
            switch (true) {
                case (rating >= 0 && rating <= 2.5):
                    return "red";
                case (rating > 2.5 && rating < 4):
                    return "orange";
                case (rating >= 4):
                    return "green";
                default:
                    return theme.palette.info.main;
            }
        }
    };

    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mx: {xs: 1},
            }}>
                <Typography variant="body1" sx={{
                    fontWeight: "bold", color: theme.palette.info.main
                }}>
                    {label}
                </Typography>
                <Typography
                    sx={{
                        color: rating ? ratingColor() : theme.palette.info.main,
                    }}
                   >
                    {information}
                </Typography>
            </Box>
            <Divider sx={{backgroundColor: theme.palette.lightColor.main, width: "full", my: 2}}/>
        </>
    );
};

export default ProductSpecificInfo;