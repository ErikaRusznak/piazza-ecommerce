"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/templates/MainLayout";
import Typography from "@mui/material/Typography";
import useTheme from "@/theme/themes";
import { getOrderByIdApi } from "../../../../api/entities/OrderApi";
import {Box, Button, Container, Grid, Paper} from "@mui/material";
import UnauthenticatedMessage from "@/components/atoms/UnauthenticatedMessage";
import { useAuth } from "../../../../api/auth/AuthContext";
import OrderStatus from "@/components/atoms/order/OrderStatus";
import {useRouter} from "next/navigation";
import {baseURL} from "../../../../api/ApiClient";
import TableContainerComponent from "@/components/moleculas/table/TableContainerComponent";

type OrderPageProps = {
    params: {
        id: string;
    };
};

const tableCellLabels = ["Image", "Name", "Price", "Quantity", "Unit of Measure", "Total Price"];


const OrderPage = ({ params }: OrderPageProps) => {
    const theme = useTheme();
    const id = Number(params.id);
    const { isAuthenticated } = useAuth();
    const [order, setOrder] = useState<any>();
    const [changeOrder, setChangeOrder] = useState<string>();

    const renderCell = (item: any, key: string) => {
        switch (key) {
            case 'Image':
                return (
                    <img src={`${baseURL}${item.imageName}`} alt={item.name}
                         style={{width: '100%', height: 'auto', maxWidth: '70px'}}/>
                );
            case 'Name':
                return item.name;
            case 'Price':
                return `${item.price.toFixed(2)} RON`;
            case 'Quantity':
                return item.quantity;
            case 'Unit of Measure':
                return item.unitOfMeasure;
            case 'Total Price':
                return `${item.totalPrice.toFixed(2)} RON`
            default:
                return null;
        }
    };

    const orderItemsToDisplay = order?.orderItems.map((orderItem: any) => ({
        imageName: orderItem.product.imageName,
        name: orderItem.product.name,
        price: orderItem.product.price,
        quantity: orderItem.quantity,
        unitOfMeasure: orderItem.product.unitOfMeasure,
        totalPrice: orderItem.quantity * orderItem.product.price
    }));

    const getOrderById = (id: number) => {
        getOrderByIdApi(id)
            .then((res) => {
                setOrder(res.data);
                console.log(res.data);
            })
            .catch((err) => console.error(err));
    };

    const updateOrderStatusLocally = (newStatus: string) => {
        setChangeOrder(newStatus);
        setOrder((prevOrder: any) => ({
            ...prevOrder,
            orderStatus: newStatus,
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
                        <Typography variant="h4" color={theme.palette.info.main} sx={{ mb: 2 }}>
                            Order #{order.orderNumber}
                        </Typography>
                        <OrderStatus orderStatus={order.orderStatus} orderId={id} updateStatus={updateOrderStatusLocally} />
                        <Grid container spacing={3} sx={{mt: 2}}>
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ p: 2, backgroundColor: theme.palette.background.lighter, border: "1px solid #a5b4fc" }}>
                                    <Typography variant="h6" color={theme.palette.lightColor.main} sx={{ mb: 2 }}>
                                        Customer Details
                                    </Typography>
                                    <Typography variant="body1" color={theme.palette.info.main}>
                                        <span style={{fontWeight: "bold"}}>Name:</span> {order.buyerFirstName} {order.buyerLastName}
                                    </Typography>
                                    <Typography variant="body1" color={theme.palette.info.main} sx={{mt: 1}}>
                                        <span style={{fontWeight: "bold"}}>Email</span>: {order.buyerEmail}
                                    </Typography>
                                    <Typography variant="body1" color={theme.palette.info.main} sx={{mt: 1}}>
                                        <span style={{fontWeight: "bold"}}>Telephone</span>: {order.buyerTelephone}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ p: 2, backgroundColor: theme.palette.background.lighter, border: "1px solid #a5b4fc" }}>
                                    <Typography variant="h6" color={theme.palette.lightColor.main} sx={{ mb: 2 }}>
                                        Shipping Address
                                    </Typography>
                                    <Typography variant="body1" color={theme.palette.info.main}>
                                        {order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2}
                                    </Typography>
                                    <Typography variant="body1" color={theme.palette.info.main}>
                                        {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country},{" "}
                                        {order.shippingAddress.zipCode}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Box mt={4}>
                            <Typography variant="h6" color={theme.palette.lightColor.main} sx={{fontWeight: "bold"}}>
                                Order Items
                            </Typography>
                            <TableContainerComponent
                                items={orderItemsToDisplay}
                                tableCellLabels={tableCellLabels}
                                renderCell={renderCell}
                            />

                        </Box>
                    </Container>
                ) : (
                    <Typography color={theme.palette.info.main}>No order with this id</Typography>
                )
            ) : (
                <UnauthenticatedMessage />
            )}
        </MainLayout>
    );
};

export default OrderPage;