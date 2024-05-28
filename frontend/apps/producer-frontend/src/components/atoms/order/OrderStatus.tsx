import React from "react";
import {useTheme} from "@mui/material/styles";
import {CancelIcon, CheckCircleOutlineIcon, LocalShippingIcon, PendingIcon, SyncIcon} from "@/components/atoms/icons";
import { markAsReadyToShip,
    markOrderAsCanceledApi,
    markOrderAsProcessingApi,
} from "../../../../api/entities/OrderApi";
import {getOrderByIdApi} from "components";
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

    const theme = useTheme();

    const getOrderStatusInfo: getStatusOrderInfoType = (status: string, orderId: number) => {
        switch (status) {
            case "PENDING":
                return {
                    message: "Mark as Processing",
                    handleChange: () => markOrderAsProcessingApi(orderId),
                    icon: <PendingIcon sx={{color: theme.palette.lightColor.main}}/>,
                };
            case "PROCESSING":
                return {
                    message: "Mark as Ready To Ship",
                    handleChange:  () => markAsReadyToShip(orderId),
                    icon: <SyncIcon sx={{color: theme.palette.lightColor.main}}/>,
                };
            case "READY_TO_SHIP":
                return {
                    message: "Mark as Ready To Ship",
                    handleChange: () => {},
                    icon: <LocalShippingIcon color="warning"/>,
                };
            case "SHIPPING":
                return {
                    message: "",
                    handleChange: () => {},
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

    const markOrderAsCanceled = () => {
        markOrderAsCanceledApi(orderId).then(res => updateStatus("CANCELLED"));
    }

    return (
        <OrderStatusComponent
            orderStatus={orderStatus}
            icon={icon}
            message={message}
            handleChangeStatus={handleChangeStatus}
            markOrderAsCanceled={markOrderAsCanceled}
        />
    );
};

export default OrderStatus;