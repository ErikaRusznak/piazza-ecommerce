"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import {getProductByIdApi} from "../../../../api/entities/ProductApi";
import {useRouteId} from "../../../../hooks/useRouteId";
import {Box, CircularProgress, Typography, useMediaQuery} from "@mui/material";
import BreadcrumbsComponent from "@/components/atoms/Breadcrumbs";
import useTheme from "@/theme/themes";
import ProductRating from "@/components/moleculas/ProductRating";
import {baseURL} from "../../../../api/ApiClient";
import ProductInformation from "@/components/moleculas/ProductInformation";
import ReviewItems from "@/components/organisms/reviews/ReviewItems";

type ProductDetailsContentProps = {
    id: string;
};

const ProductDetailsContent = ({id}: ProductDetailsContentProps) => {
    // TODO !!! - use strings for id s instead of number!
    // TODO - put productType instead of any
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

    const getProduct = (productId: number) => {
        getProductByIdApi(productId)
            .then((res) => {
                setProduct(res.data)
                setProductRating(res.data.productRating)
            })
            .catch((err) => console.log(err))
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
            <BreadcrumbsComponent links={breadcrumbsLinks}/>
            {product && (
                <Box sx={{
                    display: "flex", justifyContent: "center", alignItems: "center",
                    flexDirection: "column"
                }}>

                    <Box>
                        <Box>
                            <Typography variant="h4" sx={{
                                fontWeight: "",
                                color: theme.palette.info.main,
                                mt: 2,
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
                        <Box
                            sx={{display: "flex", justifyContent: "center",
                                flexDirection: "row", alignItems: "center",
                                [theme.breakpoints.down("md")]: {
                                    flexDirection: "column",
                                },
                                mt: 2}}>
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