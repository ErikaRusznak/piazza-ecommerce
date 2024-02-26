"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import {getProductByIdApi} from "../../../../api/entities/ProductApi";
import {useSearchParams} from "next/navigation";
import {useRouteId} from "../../../../hooks/useRouteId";
import {Box, CircularProgress, Typography, useMediaQuery} from "@mui/material";
import BreadcrumbsComponent from "@/components/atoms/Breadcrumbs";
import useTheme from "@/theme/themes";
import ProductRating from "@/components/moleculas/ProductRating";
import {baseURL} from "../../../../api/ApiClient";
import ProductInformation from "@/components/moleculas/ProductInformation";

type ProductDetailsContentProps = {
    id: string;
}
const ProductDetailsContent = ( { id } : ProductDetailsContentProps) => {
    // TODO !!! - use strings for id s instead of number!
    // TODO - put productType instead of any
    const productId = parseInt(id);
    const [product, setProduct] = useState<any>(null);
    const [productRating, setProductRating] = useState<number | null>(null);
    const theme = useTheme();

    const mediumScreenSize = useMediaQuery(theme.breakpoints.only("md"));
    const widthForImage = mediumScreenSize ? "20rem" : "30rem";

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
            {product && (
                <Box>
                    <Box sx={{
                        display: "flex", justifyContent: "center", alignItems: "center",
                        xs: {flexDirection: "column"}, sm: {flexDirection: "column"},
                        gap: 4,
                    }}>

                        <Box sx={{width: "full", alignItems: "center"}}>

                            <Box>
                                <BreadcrumbsComponent links={breadcrumbsLinks}/>
                                <Typography variant="body1" sx={{
                                    fontWeight: 500,
                                    color: theme.palette.info.main,
                                    mt: 2,
                                }}>
                                    {product.name}
                                </Typography>
                            </Box>

                            <Box sx={{mt: 2, display: "block"}}>
                                <ProductRating
                                    rating={product.productRating}
                                    numReviews={product.numberReviews}
                                    isRatingDisplayed={product.ratingApplicable}
                                    viewType='extended'
                                />
                            </Box>


                            <Box sx={{display: "flex", xs: {flexDirection: "column"}, sm: {flexDirection: "column"}, mt: 2}}>
                                <Box sx={{flexShrink: 0, xs: {mt: 2}, sm: {mt: 2}}}>
                                    <Box sx={{
                                        display: "flex", justifyContent: "center", alignItems: "center",
                                        width: "full", pr: 1, borderRight: "1px solid white",
                                        sm: {borderRight: "none", mt: 2}, xs: {borderRight: "none", mt: 2},
                                    }}>
                                        <img
                                            src={`${baseURL}${product.imageName}`}
                                            alt={product.name}
                                            style={{width: widthForImage}}
                                        />
                                    </Box>
                                </Box>

                                <Box sx={{ flexGrow: 1, ml: 4, sm: {ml: 0}, xs: {ml: 0} }}>
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