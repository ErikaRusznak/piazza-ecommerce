import React from "react";
import {CancelIcon, CheckCircleOutlineIcon, LocalShippingIcon, PendingIcon} from "@/components/atoms/icons";
import {
    markOrderAsDeliveredApi,
    markOrderAsShippingApi
} from "../../../../api/entities/OrderApi";
import { getOrderByIdApi } from "components";
import {OrderStatusComponent} from "ui";

type OrderStatusProps = {
    orderStatus: string;
    orderId: number;
    updateStatus: (newStatus: string) => void;
};

type getStatusOrderInfoType = (status: string, orderId: number) => {
    message: string;
    handleChange: () => void;
    icon: React.JSX.Element;
};
const OrderStatus = ({orderStatus, orderId, updateStatus}: OrderStatusProps) => {

    const getOrderStatusInfo: getStatusOrderInfoType = (status: string, orderId: number) => {
        switch (status) {
            case "READY_TO_SHIP":
                return {
                    message: "Mark as Shipping",
                    handleChange: () => markOrderAsShippingApi(orderId),
                    icon: <LocalShippingIcon color="warning"/>,
                };
            case "SHIPPING":
                return {
                    message: "Mark as delivered",
                    handleChange: () => markOrderAsDeliveredApi(orderId),
                    icon: <LocalShippingIcon color="warning"/>,
                };
            case "DELIVERED":
                return {
                    message: "",
                    handleChange: () => {},
                    icon: <CheckCircleOutlineIcon color="success"/>,
                };
            case "CANCELED":
                return {
                    message: "",
                    handleChange: () => {},
                    icon: <CancelIcon color="error"/>,
                };
            default:
                return {
                    message: "",
                    handleChange: () => {
                    },
                    icon: <PendingIcon/>
                };
        }
    };

    const handleChangeStatus = async () => {
        try {
            getOrderStatusInfo(orderStatus, orderId).handleChange();
            const updatedOrder = await getOrderByIdApi(orderId);
            const newStatus = updatedOrder.data.orderStatus;
            updateStatus(newStatus);
        } catch (error) {
            console.error("Error occurred while handling change:", error);
        }
    }

    const {message, icon} = getOrderStatusInfo(
        orderStatus,
        orderId
    );

    return (
        <OrderStatusComponent
            orderStatus={orderStatus}
            icon={icon}
            message={message}
            handleChangeStatus={handleChangeStatus}
        />

    );
};

export default OrderStatus;