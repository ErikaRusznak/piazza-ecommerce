import React from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import useTheme from "@/theme/themes";

type CartSummaryProps = {
    cartTotalPrice: number;
    shippingPrice: number;
    children: React.ReactNode;
};

const CartSummary = ({ cartTotalPrice, shippingPrice, children }: CartSummaryProps) => {
    const theme = useTheme();
    return (
        <Paper sx={{
            borderRadius: "14px",
            p: 3,
            border: "1px solid #a5b4fc",
            boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
            backgroundColor: theme.palette.background.default,
        }}>
            <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", color: theme.palette.info.main }}>
                <Typography>Subtotal</Typography>
                <Typography>{cartTotalPrice} RON</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", color: theme.palette.info.main }}>
                <Typography>Shipping</Typography>
                <Typography>{shippingPrice} RON</Typography>
            </Box>
            <Divider sx={{ my: 2, backgroundColor: theme.palette.lightColor.main }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", color: theme.palette.info.main }}>
                <Typography variant="h6" fontWeight="bold">
                    Total
                </Typography>
                <Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ }}>
                        {cartTotalPrice + shippingPrice} RON
                    </Typography>
                </Box>
            </Box>
            {children}
        </Paper>
    );
};

export default CartSummary;
