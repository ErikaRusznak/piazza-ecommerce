"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Box, Typography, useMediaQuery, Container } from "@mui/material";
import { getAllSellersApi } from "../../../api/entities/SellerApi";
import SellerSimplifiedInfo from "@/components/moleculas/SellerSimplifiedInfo";
import useTheme from "@/theme/themes";
import BreadcrumbsComponent from "@/components/atoms/Breadcrumbs";

const SellersPage = () => {
    const theme = useTheme();
    const [sellers, setSellers] = useState([]);

    const breadcrumbsLinks = [
        {label: "Home", link: "/"},
        {label: "Sellers", link: "/sellers"},
    ];

    const getAllSellers = () => {
        getAllSellersApi()
            .then((res) => {
                setSellers(res.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getAllSellers();
    }, []);

    return (
        <MainLayout>
            <BreadcrumbsComponent links={breadcrumbsLinks}/>
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    {sellers && (
                        <Box>
                            <Typography variant="h4" sx={{ color: theme.palette.info.main, mb: 2 }}>
                                Available sellers
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 4,
                                }}
                            >
                                {sellers.map((seller: any) => (
                                    <Box
                                        key={seller.id}
                                        sx={{
                                            width: "100%",
                                            borderRadius: "14px",
                                            border: "1px solid #93B1A6",
                                            boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)",
                                        }}
                                    >
                                        <SellerSimplifiedInfo seller={seller} />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}
                    {!sellers && <Typography>Loading page...</Typography>}
                </Box>
            </Container>
        </MainLayout>
    );
};

export default SellersPage;