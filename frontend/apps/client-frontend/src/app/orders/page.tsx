"use client";

import React, {useEffect, useState} from "react";
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
import {getFullOrdersForBuyer} from "../../../api/entities/OrderApi";
import {useTheme} from "@mui/material/styles";
import {Expand} from "@mui/icons-material";
import {baseURL, useAuth} from "components";
import {BreadcrumbsComponent, UnauthenticatedMessage} from "ui";
import {useThemeToggle} from "ui";
import {FullOrderType, OrderItemType, OrderType} from "@/app/order-successful/[id]/page";
import {useRouter} from "next/navigation";

const OrdersPage = () => {
    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const [fullOrders, setFullOrders] = useState<FullOrderType[]>([]);

    const router = useRouter();
    const {isAuthenticated} = useAuth();
    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, []);

    const getAllFullOrders = () => {
        getFullOrdersForBuyer()
            .then((res) => {
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
            {isAuthenticated ? (
                <Container maxWidth="lg">
                    <BreadcrumbsComponent links={breadcrumbsLinks}/>
                    <Typography variant="h4" color={theme.palette.info.main} gutterBottom sx={{marginTop: 1}}>
                        Order History
                    </Typography>
                    {fullOrders.length === 0 ? (
                        <Typography>You dont have orders yet!</Typography>
                    ) : (
                        fullOrders.map((fullOrder: FullOrderType) => (
                            <Accordion key={fullOrder.orderNumber}>
                                <AccordionSummary expandIcon={<Expand sx={{color: theme.palette.lightColor.main,}}/>}
                                                  sx={{
                                                      backgroundColor: colorToUse,
                                                      mt: 2,
                                                      border: `1px solid ${colorToUse}`,
                                                      borderRadius: "10px"
                                                  }}>
                                    <Typography variant="subtitle1" sx={{
                                        color: theme.palette.info.main,
                                        "&:hover": {color: isDark ? theme.palette.lightColor.main : theme.palette.info.contrastText}
                                    }}>
                                        Order Number: #{fullOrder.orderNumber}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{background: isDark ? "#303c59" : "white"}}>
                                    <Grid container spacing={3} sx={{}}>
                                        {fullOrder.orders.map((order: OrderType) => (
                                            <Grid item xs={12} md={6} key={order.id} sx={{}}>
                                                <Card sx={{
                                                    background: isDark ? "#303c59" : "#dbe1fd",
                                                    boxShadow: theme.shadows[8],
                                                    color: theme.palette.info.main
                                                }}>
                                                    <CardContent sx={{}}>
                                                        <Typography variant="subtitle1" gutterBottom>
                                                    <span
                                                        style={{fontWeight: "bold"}}>Seller</span>: {order.orderItems[0].product.seller.alias}
                                                        </Typography>
                                                        <Typography sx={{fontWeight: theme.typography.fontWeightMedium}}
                                                                    gutterBottom>
                                                            Order Status: <span
                                                            style={{fontWeight: theme.typography.fontWeightLight}}>{order.orderStatus}</span>
                                                        </Typography>
                                                        <Typography sx={{fontWeight: theme.typography.fontWeightMedium}}
                                                                    gutterBottom>
                                                            Order Date: <span
                                                            style={{fontWeight: theme.typography.fontWeightLight}}>{new Date(order.orderDate).toLocaleString()}</span>
                                                        </Typography>
                                                        <Typography sx={{fontWeight: theme.typography.fontWeightMedium}}
                                                                    gutterBottom>
                                                            Total Price:<span
                                                            style={{fontWeight: theme.typography.fontWeightLight}}> {order.totalPrice} RON</span>
                                                        </Typography>
                                                        <Typography sx={{fontWeight: theme.typography.fontWeightMedium}}
                                                                    gutterBottom>
                                                            Shipping Address: <span
                                                            style={{fontWeight: theme.typography.fontWeightLight}}>{`${order.shippingAddress.addressLine1}, ${order.shippingAddress.city}, ${order.shippingAddress.country}, ${order.shippingAddress.zipCode}`}</span>
                                                        </Typography>
                                                        <Typography sx={{fontWeight: theme.typography.fontWeightMedium}}
                                                                    gutterBottom>
                                                            <span style={{fontWeight: "bold"}}>Items</span>:
                                                        </Typography>
                                                        <Grid container spacing={2}>
                                                            {order.orderItems.map((item: OrderItemType) => (
                                                                <Grid item xs={12} key={item.product.id}>
                                                                    <CardMedia
                                                                        component="img"
                                                                        image={`${baseURL}${item.product.imageName}`}
                                                                        alt={item.product.name}
                                                                        style={{width: "5rem"}}
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
                        ))
                    )}

                </Container>
            ) : (
                <UnauthenticatedMessage/>
            )}

        </MainLayout>
    );
};

export default OrdersPage;
