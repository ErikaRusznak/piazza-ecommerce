"use client";
import React, { useEffect, useState } from "react";
import { getFullOrderByIdApi } from "../../../../api/entities/OrderApi";
import FullOrderInformation from "@/components/moleculas/fullOrder/FullOrderInformation";
import FullOrderItems from "@/components/moleculas/fullOrder/FullOrderItems";
import MainLayout from "@/components/templates/MainLayout";
import {Box, Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {CheckCircleOutlineIcon} from "@/components/atoms/icons";
import moment from "moment";
import {AddressType} from "@/app/checkout/page";
import {ProductType} from "../../../../contexts/CartContext";
import {useRouter} from "next/navigation";
import {useAuth} from "components";
import {UnauthenticatedMessage} from "ui";

type OrderSuccessfulPageProps = {
    params: {
        id: number;
    };
};

export type OrderItemType = {
    product: ProductType;
    quantity: number;
};

export type OrderType = {
    buyerEmail: string;
    buyerFirstName: string;
    buyerLastName: string;
    buyerTelephone: string;
    id: number;
    legalDetails: any;
    orderDate: string;
    orderItems: OrderItemType[];
    orderNumber: string;
    orderStatus: string;
    sellerEmail: string;
    sellerType: string;
    totalPrice: number;
    shippingAddress: AddressType;
};

export type FullOrderType = {
    buyerEmail: string;
    id: number;
    orderNumber: string;
    orders: OrderType[];
    publishDate: string;
    shippingAddress: AddressType;
    totalPrice: number;
};

const OrderSuccessfulPage = ({ params }: OrderSuccessfulPageProps) => {
    const fullOrderId = params.id;
    const theme = useTheme();
    const [fullOrder, setFullOrder] = useState<FullOrderType | null>(null);

    const router = useRouter();
    const {isAuthenticated} = useAuth();
    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, []);

    const getFullOrder = (fullOrderId: number) => {
        getFullOrderByIdApi(fullOrderId)
            .then((res) => {
                setFullOrder(res.data);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getFullOrder(fullOrderId);
    }, []);

    const smallerScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const variantForTitle = smallerScreen ? "h5" : "h4";

    return isAuthenticated ? (
        fullOrder && (
            <MainLayout>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <CheckCircleOutlineIcon sx={{color: "green", width: "45px"}}/>
                        </Box>

                        <Typography
                            variant={variantForTitle}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                mt: "5",
                                color: theme.palette.info.main,
                            }}
                        >
                            Thank you for your order!
                        </Typography>

                        <Box sx={{
                            backgroundColor: theme.palette.background.default,
                            mt: 2,
                            border:"1px solid #a5b4fc",
                            borderRadius: "14px",
                            p:3, display: "flex",
                            flexDirection: "row",
                            [theme.breakpoints.down("sm")]: {flexDirection: "column"},
                            gap: 3,
                        }}>
                            <Box>
                                <FullOrderInformation
                                    orderNumber={fullOrder.orderNumber}
                                    date={moment(fullOrder.publishDate).format("YYYY-MM-DD")}
                                    shippingAddress={fullOrder.shippingAddress}
                                    buyerEmail={fullOrder.buyerEmail}
                                />
                            </Box>
                            <Box>
                                <FullOrderItems
                                    orders={fullOrder.orders}
                                    totalPrice={fullOrder.totalPrice}
                                    shippingPrice={10}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </MainLayout>
        )
    ) : (
        <MainLayout>
            <UnauthenticatedMessage />
        </MainLayout>
    );
};

export default OrderSuccessfulPage;
