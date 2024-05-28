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
import {useTheme} from "@mui/material/styles";
import {Expand} from "@mui/icons-material";
import {baseURL} from "components";
import {BreadcrumbsComponent} from "ui";
import {useThemeToggle} from "ui";

const OrdersPage: React.FC = () => {
    const theme = useTheme(); // Apply the custom theme
    const {isDark} = useThemeToggle();
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

    const colorToUse = isDark ? theme.palette.background.lighter : theme.palette.lightColor.main;

    return (
        <MainLayout>
            <BreadcrumbsComponent links={breadcrumbsLinks}/>
            <Container maxWidth="lg">
            <Typography variant="h4" color={theme.palette.info.main} gutterBottom sx={{ marginTop:3}}>
                Order History
            </Typography>
            {fullOrders.map((fullOrder: any) => (
                <Accordion key={fullOrder.orderNumber}>
                    <AccordionSummary expandIcon={<Expand sx={{color: theme.palette.lightColor.main, }}/>} sx={{ backgroundColor: colorToUse, mt:2, border: `1px solid ${colorToUse}`, borderRadius: "10px" }}>
                        <Typography variant="subtitle1" sx={{ color: theme.palette.info.main, "&:hover": {color: isDark ? theme.palette.lightColor.main : theme.palette.info.contrastText} }}>
                            Order Number: #{fullOrder.orderNumber}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{background: isDark ? "#303c59" : "#d2d9fd"}}>
                        <Grid container spacing={3} sx={{}}>
                            {fullOrder.orders.map((order: any) => (
                                <Grid item xs={12} md={6} key={order.id} sx={{}}>
                                    <Card sx={{background: isDark ? "#303c59" : "#dbe1fd", boxShadow: theme.shadows[8],  color: theme.palette.info.main}}>
                                        <CardContent sx={{}}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                <span style={{fontWeight: "bold"}}>Seller</span>: {order.orderItems[0].product.seller.alias}
                                            </Typography>
                                            <Typography sx={{fontWeight: theme.typography.fontWeightMedium}} gutterBottom>
                                                Order Status: <span style={{fontWeight: theme.typography.fontWeightLight}}>{order.orderStatus}</span>
                                            </Typography>
                                            <Typography  sx={{fontWeight: theme.typography.fontWeightMedium}} gutterBottom>
                                                Order Date: <span style={{fontWeight: theme.typography.fontWeightLight}}>{new Date(order.orderDate).toLocaleString()}</span>
                                            </Typography>
                                            <Typography  sx={{fontWeight: theme.typography.fontWeightMedium}} gutterBottom>
                                                Total Price:<span style={{fontWeight: theme.typography.fontWeightLight}}> {order.totalPrice} USD</span>
                                            </Typography>
                                            <Typography sx={{fontWeight: theme.typography.fontWeightMedium}} gutterBottom>
                                                Shipping Address: <span style={{fontWeight: theme.typography.fontWeightLight}}>{`${order.shippingAddress.addressLine1}, ${order.shippingAddress.city}, ${order.shippingAddress.country}, ${order.shippingAddress.zipCode}`}</span>
                                            </Typography>
                                            <Typography sx={{fontWeight: theme.typography.fontWeightMedium}} gutterBottom>
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
