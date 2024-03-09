"use client";

import React from "react";
import useTheme from "@/theme/themes";
import MainLayout from "@/components/templates/MainLayout";
import Typography from "@mui/material/Typography";

const ProductPage = () => {

    const theme = useTheme();

    return (
        <MainLayout>
            <Typography>Product page</Typography>
        </MainLayout>
    );
};

export default ProductPage;