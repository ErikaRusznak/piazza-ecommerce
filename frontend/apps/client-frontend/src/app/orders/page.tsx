"use client";

import React, { useEffect, useState } from "react";
import {
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Container
} from "@mui/material";
import MainLayout from "@/components/templates/MainLayout";
import { getFullOrdersForBuyer } from "../../../api/entities/OrderApi";
import useTheme from "@/theme/themes";
import {Expand} from "@mui/icons-material";
import {baseURL} from "../../../api/ApiClient";
import BreadcrumbsComponent from "@/components/atoms/Breadcrumbs";

const OrdersPage: React.FC = () => {
    const theme = useTheme(); // Apply the custom theme

    const [fullOrders, setFullOrders] = useState([]);

    const getAllFullOrders = () => {
        getFullOrdersForBuyer()
            .then((res) => {
                console.log(res.data)
                setFullOrders(res.data);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getAllFullOrders();
    }, []);

    const breadcrumbsLinks = [
        {label: "Home", link: "/"},
        {label: "Orders", link: ""},
    ];

    return (
        <MainLayout>
            <BreadcrumbsComponent links={breadcrumbsLinks}/>
            <Container maxWidth="lg">
            <Typography variant="h4" color={theme.palette.info.main} gutterBottom sx={{ marginTop:3}}>
                Order History
            </Typography>
            {fullOrders.map((fullOrder: any) => (
                <Accordion key={fullOrder.orderNumber}>
                    <AccordionSummary expandIcon={<Expand sx={{color: theme.palette.lightColor.main, }}/>} sx={{ backgroundColor: theme.palette.background.lighter, mt:2, border: "1px solid #a5b4fc", borderRadius: "15px" }}>
                        <Typography variant="subtitle1" sx={{ color: theme.palette.info.main, "&:hover": {color: theme.palette.lightColor.main} }}>
                            Order Number: #{fullOrder.orderNumber}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{background: theme.palette.background.lighter,}}>
                        <Grid container spacing={3} sx={{}}>
                            {fullOrder.orders.map((order: any) => (
                                <Grid item xs={12} md={6} key={order.id} sx={{}}>
                                    <Card sx={{background: theme.palette.background.lighter, boxShadow: theme.shadows[8],  color: theme.palette.info.main}}>
                                        <CardContent sx={{}}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                <span style={{fontWeight: "bold"}}>Seller</span>: {order.orderItems[0].product.seller.alias}
                                            </Typography>
                                            <Typography variant="subtitle2" gutterBottom>
                                                <span style={{fontWeight: "bold"}}>Order Status</span>: {order.orderStatus}
                                            </Typography>
                                            <Typography variant="subtitle2" gutterBottom>
                                                <span style={{fontWeight: "bold"}}>Order Date</span>: {new Date(order.orderDate).toLocaleString()}
                                            </Typography>
                                            <Typography variant="subtitle2" gutterBottom>
                                                <span style={{fontWeight: "bold"}}>Total Price</span>: {order.totalPrice} USD
                                            </Typography>
                                            <Typography variant="subtitle2" gutterBottom>
                                                <span style={{fontWeight: "bold"}}>Shipping Address</span>: {`${order.shippingAddress.addressLine1}, ${order.shippingAddress.city}, ${order.shippingAddress.country}, ${order.shippingAddress.zipCode}`}
                                            </Typography>
                                            <Typography variant="subtitle2" gutterBottom>
                                                <span style={{fontWeight: "bold"}}>Items</span>:
                                            </Typography>
                                            <Grid container spacing={2}>
                                                {order.orderItems.map((item: any) => (
                                                    <Grid item xs={12} key={item.product.id}>
                                                        <CardMedia
                                                            component="img"
                                                            image={`${baseURL}${item.product.imageName}`}
                                                            alt={item.product.name}
                                                            style={{ width: "5rem" }}
                                                        />
                                                        <Typography variant="body2" gutterBottom>
                                                            {item.product.name} - Quantity: {item.quantity}
                                                        </Typography>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}
            </Container>
        </MainLayout>
    );
};

export default OrdersPage;
