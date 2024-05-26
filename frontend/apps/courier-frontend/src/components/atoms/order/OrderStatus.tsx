import React from "react";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import {CancelIcon, CheckCircleOutlineIcon, LocalShippingIcon, PendingIcon} from "@/components/atoms/icons";
import OrderStatusPopover from "@/components/atoms/order/OrderStatusPopover";
import {
    markOrderAsDeliveredApi,
    markOrderAsShippingApi
} from "../../../../api/entities/OrderApi";
import { getOrderByIdApi } from "components";

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

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
        <Box sx={{display: "flex", gap: 1,}}>

            <Typography
                color={theme.palette.info.main}
                sx={{mt: 0.3, cursor: "pointer", "&:hover": {textDecoration: "underline"}}}
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Status: {orderStatus}
            </Typography>
            {icon}
            {id && orderStatus !== "DELIVERED" && orderStatus !== "CANCELED"  && (
                <OrderStatusPopover
                    open={open}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    markedAsMessage={message}
                    handleChange={handleChangeStatus}
                />
            )}

        </Box>
    );
};

export default OrderStatus;