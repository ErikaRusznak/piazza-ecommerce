"use client";

import React from "react";
import {useCart} from "../../../contexts/CartContext";
import {redirect, useRouter} from "next/navigation";
import { useAuth } from "components";
import MainLayout from "@/components/templates/MainLayout";
import ErrorComponent from "@/components/organisms/error/ErrorComponent";
import CartItemCard from "@/components/moleculas/cart/CartItemCard";
import CartSummary from "@/components/moleculas/cart/CartSummary";
import {Container, Grid, Typography} from "@mui/material";
import useTheme from "@/theme/themes";
import StyledButton from "@/components/atoms/StyledButton";
import BreadcrumbsComponent from "@/components/atoms/Breadcrumbs";

const ShoppingCartPage = () => {

    const {allCartItems, numberOfCartItems, cartTotalPrice} = useCart();
    const shippingPrice = 10;
    // const {isAuthenticated} = useAuth();
    // if (!isAuthenticated) {
    //     redirect("/login");
    // }
    // TODO - redirect pages if not authenticated
    const theme = useTheme();

    const router = useRouter();
    const breadcrumbsLinks = [
        {label: "Home", link: "/"},
        {label: "Cart", link: ""},
    ];

    return (
        <MainLayout>
            <BreadcrumbsComponent links={breadcrumbsLinks}/>
            <Container sx={{paddingTop: 2}}>
                {numberOfCartItems !== 0 && (
                    <Typography variant="h4" align="center"
                                sx={{mb: 2, fontWeight: "bold", color: theme.palette.info.main}}>
                        Cart
                    </Typography>
                )}

                {numberOfCartItems !== 0 && (
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={8}>
                            {allCartItems?.map((cartItem) => (
                                <CartItemCard key={cartItem.id} item={cartItem} isModifiable={true}/>
                            ))}
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <CartSummary cartTotalPrice={cartTotalPrice} shippingPrice={shippingPrice}>
                                <StyledButton
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3}}
                                    onClick={() => router.push("/checkout")}
                                >
                                    Checkout
                                </StyledButton>
                            </CartSummary>
                        </Grid>
                    </Grid>
                )}

                {numberOfCartItems === 0 && allCartItems !== null && (
                    <ErrorComponent
                        description="You don't have any items in Cart. Add products from the shop!"
                        solution="Shop now!"
                        linkTo="/shop"
                    />
                )}
            </Container>
        </MainLayout>
    );
};

export default ShoppingCartPage;
