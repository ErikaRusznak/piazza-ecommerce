import React from "react";
import { baseURL } from "components";
import { Box, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type FullOrderItemsProps = {
    orders: any[];
    totalPrice: number;
    shippingPrice: number;
};

const FullOrderItems = ({ orders, totalPrice, shippingPrice }: FullOrderItemsProps) => {
    const fixedTotalPrice = parseFloat(totalPrice.toFixed(2));
    const finalPrice = fixedTotalPrice + shippingPrice;
    const theme = useTheme();

    const textStyle = {
        fontSize: "16px",
        fontWeight: theme.typography.fontWeightRegular,
    };

    return (
        (orders && totalPrice) && (
            <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: theme.palette.primary.main }}>
                    Ordered Items
                </Typography>

                {orders.map((orderFromSeller, index) => (
                    <div key={index}>
                        {orderFromSeller.orderItems.map((orderItem: any, index1: number) => (
                            <div key={index1}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, mb: 1 }}>
                                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                                        <img src={`${baseURL}${orderItem.product.imageName}`} alt={orderItem.product.name} style={{ width: "5rem" }} />
                                        <Box sx={{ color: theme.palette.text.primary }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                                {orderItem.product.name}
                                            </Typography>
                                            <Typography variant="caption">{orderItem.product.seller.alias}</Typography>
                                            <Typography variant="caption">{` x ${orderItem.quantity}`}</Typography>
                                        </Box>
                                    </Box>
                                    <Typography sx={{ color: theme.palette.text.primary }} variant="body1">{`${(orderItem.product.price * orderItem.quantity).toFixed(2)} RON`}</Typography>
                                </Box>
                                <Divider />
                            </div>
                        ))}
                    </div>
                ))}

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, color: theme.palette.text.primary }}>
                    <Typography sx={textStyle}>Subtotal</Typography>
                    <Typography sx={textStyle}>{`${fixedTotalPrice} RON`}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", color: theme.palette.text.primary }}>
                    <Typography sx={textStyle}>Shipping payment</Typography>
                    <Typography sx={textStyle}>{`${shippingPrice} RON`}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, color: theme.palette.text.primary }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Total
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>{`${finalPrice} RON`}</Typography>
                </Box>
            </Box>
        )
    );
};

export default FullOrderItems;
