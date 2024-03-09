"use client";

import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import Typography from "@mui/material/Typography";
import useTheme from "@/theme/themes";

const OrderPage = () => {

    const theme = useTheme();

    return (
        <MainLayout>
            <Typography>Order page</Typography>
        </MainLayout>
    );
};

export default OrderPage;