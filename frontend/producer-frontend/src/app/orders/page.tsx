"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import Typography from "@mui/material/Typography";
import useTheme from "@/theme/themes";
import {useAuth} from "../../../api/auth/AuthContext";
import {getOrdersForSellerApi} from "../../../api/entities/OrderApi";
import {useRouter} from "next/navigation";
import {Button, Container} from "@mui/material";
import moment from 'moment';
import UnauthenticatedMessage from "@/components/atoms/UnauthenticatedMessage";
import TableContainerComponent from "@/components/moleculas/table/TableContainerComponent";

const tableCellLabels = ["Order Number", "Order Date", "Buyer Name", "Total Price", "Status", "Actions"];

const OrdersPage = () => {

    const renderCell = (item: any, key: string) => {
        const theme = useTheme();
        const router = useRouter();
        switch (key) {
            case 'Order Number':
                return item.orderNumber;
            case 'Buyer Name':
                return item.buyerName;
            case 'Order Date':
                return moment(item.orderDate).format("YYYY-MM-DD HH:mm");
            case 'Total Price':
                return `${item.totalPrice.toFixed(2)} RON`;
            case "Status":
                return item.orderStatus;
            case "Actions":
                return (
                    <>
                        <Button size="small" sx={{color: theme.palette.lightColor.main}}
                                onClick={() => {
                                    console.log(item);
                                    router.push(`/orders/${item.id}`)
                                }}>
                            View
                        </Button>
                    </>
                )
            default:
                return null;
        }
    }
    const theme = useTheme();
    const {username, isAuthenticated} = useAuth();
    const [orders, setOrders] = useState([]);

    const getOrdersForSeller = (sellerEmail: string) => {
        getOrdersForSellerApi(sellerEmail)
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        if (username) {
            getOrdersForSeller(username);
        }
    }, [username]);

    const displayOrders = orders?.map((order: any) => ({
        id: order.id,
        buyerName: order.buyerFirstName + " " + order.buyerLastName,
        orderNumber: "# "+order.orderNumber,
        orderDate: order.orderDate,
        totalPrice: order.totalPrice,
        orderStatus: order.orderStatus,
    }));

    return (
        <>
            <MainLayout>
                {isAuthenticated ? (
                    <Container>
                        <Typography variant="h4" color={theme.palette.info.main} sx={{mb: 2}}>
                            Orders
                        </Typography>
                        <TableContainerComponent
                            items={displayOrders}
                            tableCellLabels={tableCellLabels}
                            renderCell={renderCell}
                        />
                    </Container>
                ) : (
                    <UnauthenticatedMessage/>
                )}
            </MainLayout>
        </>
    );
};

export default OrdersPage;