import React from "react";
import {Box, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import ProductSpecificInfo from "@/components/atoms/product/ProductSpecificInfo";

type ProductInformationProps = {
    product: any;
}
const ProductInformation = ({product}: ProductInformationProps) => {

    const theme = useTheme();
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "25rem",
            [theme.breakpoints.down("md")]: {width: "20rem"},
        }}>
            <Typography variant="body1"
                        sx={{
                            mt: 1,
                            color: theme.palette.info.main,
                            ml: {xs: 1},
                        }}>
                {product.description}
            </Typography>
            <Box sx={{mt: 3}}>
                <ProductSpecificInfo
                    label="Category"
                    information={product.category.name}
                />
                <ProductSpecificInfo
                    label="Price"
                    information={`${product.price} RON`}
                />
                <ProductSpecificInfo
                    label="Rating"
                    information={`${product.productRating} out of 5`}
                    rating={product.productRating}
                />
                <ProductSpecificInfo
                    label="No. reviews"
                    information={`${product.numberReviews} reviews`}
                />
                <ProductSpecificInfo
                    label="No. remaining items"
                    information={`${product.quantity} products`}
                />
            </Box>
        </Box>
    );
};

export default ProductInformation;