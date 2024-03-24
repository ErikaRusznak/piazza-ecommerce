"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import Typography from "@mui/material/Typography";
import useTheme from "@/theme/themes";
import {getOrderByIdApi} from "../../../../api/entities/OrderApi";
import {Box, Container} from "@mui/material";
import UnauthenticatedMessage from "@/components/atoms/UnauthenticatedMessage";
import {useAuth} from "../../../../api/auth/AuthContext";
import OrderStatus from "@/components/atoms/order/OrderStatus";

type OrderPageProps = {
    params: {
        id: string;
    }
}

const OrderPage = ({params}: OrderPageProps) => {

    const theme = useTheme();
    const id = Number(params.id);
    const {isAuthenticated} = useAuth();
    const [order, setOrder] = useState<any>();
    const [changeOrder, setChangeOrder] = useState<string>();

    const getOrderById = (id: number) => {
        getOrderByIdApi(id)
            .then((res) => {
                setOrder(res.data);
                console.log(res.data)
            })
            .catch((err) => console.error(err))
    };

    const updateOrderStatusLocally = (newStatus: string) => {
        setChangeOrder(newStatus);
        setOrder((prevOrder:any) => ({
            ...prevOrder,
            orderStatus: newStatus
        }));
    };

    useEffect(() => {
        getOrderById(id);
    }, [changeOrder]);

    return (
        <MainLayout>
            {isAuthenticated ? (
                order ? (
                    <Container>
                        <Typography variant="h4" color={theme.palette.info.main} sx={{mb: 1}}>
                            Order #{order.orderNumber}
                        </Typography>
                        <OrderStatus
                            orderStatus={order.orderStatus}
                            orderId={id}
                            updateStatus={updateOrderStatusLocally}
                        />

                    </Container>
                ) : (
                    <Typography color={theme.palette.info.main}>No order with this id</Typography>
                )
            ) : (
                <UnauthenticatedMessage/>
            )}
        </MainLayout>

    );
};

export default OrderPage;