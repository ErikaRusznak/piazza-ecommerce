"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import {getProductByIdApi} from "components";
import {useRouteId} from "components";
import {Box, CircularProgress, Typography, useMediaQuery} from "@mui/material";
import {BreadcrumbsComponent} from "ui";
import {useTheme} from "@mui/material/styles";
import {ProductRating} from "ui";
import {baseURL} from "components";
import ProductInformation from "@/components/moleculas/ProductInformation";
import ReviewItems from "@/components/organisms/reviews/ReviewItems";

type ProductDetailsContentProps = {
    id: string;
};

const ProductDetailsContent = ({id}: ProductDetailsContentProps) => {
    const productId = parseInt(id);
    const [product, setProduct] = useState<any>(null);
    const [productRating, setProductRating] = useState<number | null>(null);
    const theme = useTheme();
    const productName = product?.name;

    const downMedScreenSize = useMediaQuery(theme.breakpoints.down("md"));
    const widthForImage = downMedScreenSize ? "19rem" : "25rem";

    const breadcrumbsLinks = [
        {label: "Home", link: "/"},
        {label: "Shop", link: "/shop"},
        {label: productName, link: ""}
    ];

    const updateProductAvailability = (newAvailability: string, newAvailableQuantity: number) => {
        setProduct({
            ...product,
            availability: newAvailability,
            quantity: newAvailableQuantity
        });
    };

    const getAvailabilityLabel = (): {colorForAvailability: string,labelForAvailability:string} | null => {
        switch(product?.availability) {
            case "OUT_OF_STOCK":
                return {
                    colorForAvailability: "rgba(255, 0, 0)",
                    labelForAvailability: "Sorry, this item is out of stock!"
                };
            case "FEW_ITEMS_LEFT":
                return {
                    colorForAvailability: "rgba(255, 165, 0)",
                    labelForAvailability: "There are " + product.quantity + " items left!"
                };
            default:
                return null;
        }
    };

    const availabilityLabel = getAvailabilityLabel();

    const getProduct = (productId: number) => {
        getProductByIdApi(productId)
            .then((res) => {
                setProduct(res.data)
                setProductRating(res.data.productRating)
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        getProduct(productId);
    }, []);

    const updateProductRating = (newRating: number) => {
        setProduct({
            ...product,
            productRating: newRating,
        });
    };

    return (
        <MainLayout>

            {product && (
                <Box sx={{
                    display: "flex", justifyContent: "center", alignItems: "center",
                    flexDirection: "column"
                }}>
                    <Box>
                        <Box>
                            <BreadcrumbsComponent links={breadcrumbsLinks}/>
                            <Typography variant="h4" sx={{
                                fontWeight: "",
                                color: theme.palette.info.main,
                                mt: 1,
                                ml: {xs: 2, sm: 0},
                            }}>
                                {product.name}
                            </Typography>
                        </Box>

                        <Box sx={{display: "block", mt: 1, ml: {xs: 2, sm: 0}}}>
                            <ProductRating
                                rating={product.productRating}
                                numReviews={product.numberReviews}
                                isRatingDisplayed={product.ratingApplicable}
                                viewType='extended'
                            />
                        </Box>
                        {product.availability !== "AVAILABLE" ? (
                            <Typography
                                sx={{mt:1,}}
                                color={availabilityLabel?.colorForAvailability}
                            >
                                {availabilityLabel?.labelForAvailability}
                            </Typography>
                        ): null}

                        <Box
                            sx={{display: "flex", justifyContent: "center",
                                flexDirection: "row", alignItems: "center",
                                [theme.breakpoints.down("md")]: {
                                    flexDirection: "column",
                                },
                                mt: 1}}>
                            <Box sx={{ [theme.breakpoints.down("md")]: {mt: 2}}}>
                                <Box sx={{
                                    display: "flex", justifyContent: "center",
                                    pr: 1, borderRight: "1px solid #a5b4fc",
                                    [theme.breakpoints.down("md")]: {
                                        borderRight: "none", mt: 2, pr: 0,
                                    },
                                }}>
                                    <img
                                        src={`${baseURL}${product.imageName}`}
                                        alt={product.name}
                                        style={{width: widthForImage}}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ml: 4,
                                    [theme.breakpoints.down("md")]: {mx: 1}
                            }}>
                                <ProductInformation
                                    description={product.description}
                                    price={product.price}
                                    category={product.category.name}
                                    producer={product.seller.alias}
                                    city={product.seller.city}
                                    productId={product.id}
                                    availability={product.availability}
                                    availableQuantity={product.quantity}
                                    unitOfMeasure={product.unitOfMeasure}
                                    updateProductAvailability={updateProductAvailability}
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: "flex", justifyContent: "center", alignItems: "center",
                        width: "100%", maxWidth: "53rem", [theme.breakpoints.down("md")]: {maxWidth: "38rem"},
                    }}>
                        <Box sx={{ width: "100%", mt: 2}}>
                            <ReviewItems
                                productId={product.id}
                                updateProductRating={updateProductRating}
                            />
                        </Box>
                    </Box>
                </Box>
            )}
        </MainLayout>
    );
};

const ProductDetailsPage = () => {
    const id = useRouteId();
    return <>{id ? <ProductDetailsContent id={id}/> : <CircularProgress/>}</>
}

export default ProductDetailsPage;