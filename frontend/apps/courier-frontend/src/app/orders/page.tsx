"use client";

import moment from 'moment';
import useTheme from "@/theme/themes";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {Button, Container, FormControl, Typography} from "@mui/material";
import {useAuth} from "../../../api/auth/AuthContext";
import {getOrdersForCourierApi} from "../../../api/entities/OrderApi";
import MainLayout from "@/components/templates/MainLayout";
import UnauthenticatedMessage from "@/components/atoms/UnauthenticatedMessage";
import {CssTextFieldDarkBackground} from "@/components/atoms/form/dark/CssTextFieldDarkBackground";
import TableContainerComponent from "@/components/moleculas/table/TableContainerComponent";
import MenuItem from "@mui/material/MenuItem";

type OrderType = {
    buyerEmail: string;
    buyerFirstName: string;
    buyerLastName: string;
    buyerTelephone: string;
    id: number;
    legalDetails: null | any;
    orderDate: Date | string;
    orderNumber: string;
    orderItems: any[];
    orderStatus: string;
    sellerEmail: string;
    sellerType: string;
    shippingAddress: any;
    totalPrice: number;
};

const tableCellLabels = ["Order Number", "Order Date", "Buyer Name", "Seller Email", "Total Price", "Status", "Actions"];

const OrdersPage = () => {

    const theme = useTheme();
    const router = useRouter();
    const renderCell = (item: any, key: string) => {
        switch (key) {
            case 'Order Number':
                return item.orderNumber;
            case 'Buyer Name':
                return item.buyerName;
            case 'Seller Email':
                return item.sellerEmail;
            case 'Order Date':
                return moment(item.orderDate).format("YYYY-MM-DD HH:mm");
            case 'Total Price':
                return `${item.totalPrice.toFixed(2)} RON`;
            case "Status":
                return item.orderStatus;
            case "Actions":
                return (
                    <>
                        <Button size="small" sx={{color: theme.palette.primary.main}}
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
    };

    const [selectedStatusFilter, setSelectedStatusFilter] = useState<string | null>(null);

    const {isAuthenticated, username} = useAuth();
    const [orders, setOrders] = useState<OrderType[]>([]);

    const getOrdersForCourier = (email: string) => {
        getOrdersForCourierApi(email)
            .then((res) => {
                console.log(res.data)
                setOrders(res.data);
            })
            .catch((err) => console.error(err))
    }


    useEffect(() => {
        if(username) {
            getOrdersForCourier(username);
        }
    }, [username]);

    const handleFilterChange = (event: { target: { value: string; }; }) => {
        setSelectedStatusFilter(event.target.value as string);
    };

    const displayOrders = orders?.filter(order => {
        if (!selectedStatusFilter || selectedStatusFilter === "ALL") {
            return true;
        }
        return order.orderStatus === selectedStatusFilter;
    }).map(order => ({
        id: order.id,
        buyerName: order.buyerFirstName + " " + order.buyerLastName,
        sellerEmail: order.sellerEmail,
        orderNumber: "# " + order.orderNumber,
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
                        <FormControl sx={{mb: 2, width: "200px"}}>
                            <CssTextFieldDarkBackground
                                label="Status"
                                select
                                value={selectedStatusFilter || ""}
                                onChange={handleFilterChange}
                            >
                                <MenuItem value="ALL">All</MenuItem>
                                <MenuItem value="READY_TO_SHIP">Ready To Ship</MenuItem>
                                <MenuItem value="SHIPPING">Shipping</MenuItem>
                                <MenuItem value="DELIVERED">Delivered</MenuItem>
                            </CssTextFieldDarkBackground>
                        </FormControl>
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