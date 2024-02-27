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

    const downMedScreenSize = useMediaQuery(theme.breakpoints.down("md"));
    const widthForImage = downMedScreenSize ? "19rem" : "25rem";

    const breadcrumbsLinks = [
        {label: "Home", link: "/"},
        {label: "Register", link: "/register"}
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
                    flexDirection: "column",
                    gap: 10,
                }}>

                    <Box sx={{width: "full", }}>
                        <Box>
                            <Typography variant="h4" sx={{
                                fontWeight: "",
                                color: theme.palette.info.main,
                                mt: 2,
                            }}>
                                {product.name}
                            </Typography>
                        </Box>

                        <Box sx={{display: "block", mt: 1}}>
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
                            <Box sx={{ [theme.breakpoints.down("md")]: {mt: 2,}}}>
                                <Box sx={{
                                    display: "flex", justifyContent: "center",
                                    width: "full", pr: 1, borderRight: "1px solid #93B1A6",
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
                                    [theme.breakpoints.down("md")]: {ml: 0}}}>
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

                    {/*<div className="flex justify-center items-center w-full">*/}
                    {/*    <div*/}
                    {/*        className="w-full mt-10 sm:mt-8">*/}
                    {/*        <ReviewItems*/}
                    {/*            productId={product.id}*/}
                    {/*            updateProductRating={updateProductRating}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
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