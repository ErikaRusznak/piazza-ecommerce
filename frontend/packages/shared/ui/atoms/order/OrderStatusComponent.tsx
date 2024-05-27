"use client";

import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import {useState} from "react";
import OrderStatusPopover from "./OrderStatusPopover";

type OrderStatusComponentProps = {
    orderStatus: string;
    icon: React.JSX.Element;
    message: string;
    handleChangeStatus: () => void;
    markOrderAsCanceled?: () => void;
};

const OrderStatusComponent = ({orderStatus, icon, message, handleChangeStatus, markOrderAsCanceled}:OrderStatusComponentProps) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
                    markAsCancelled={markOrderAsCanceled}
                />
            )}

        </Box>
    );
};

export default OrderStatusComponent;