"use client";

import React, {useEffect} from "react";
import MainLayout from "@/components/templates/MainLayout";
import Typography from "@mui/material/Typography";
import useTheme from "@/theme/themes";
import {getOrderByIdApi} from "../../../../api/entities/OrderApi";

type OrderPageProps = {
    params: {
        id: string;
    }
}

const OrderPage = ({params}: OrderPageProps) => {

    const theme = useTheme();
    const id = Number(params.id);
    const getOrderById = (id: number) => {
        getOrderByIdApi(id)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.error(err))
    };

    useEffect(() => {
        getOrderById(id);
    }, []);


    return (
        <MainLayout>
            <Typography>Order page</Typography>
        </MainLayout>
    );
};

export default OrderPage;