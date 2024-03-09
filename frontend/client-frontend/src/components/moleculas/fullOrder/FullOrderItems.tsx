import React from "react";
import {baseURL} from "../../../../api/ApiClient";
import {Box, Divider, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import useTheme from "@/theme/themes";

type FullOrderItemsProps = {
    orders: any[];
    totalPrice: number;
    shippingPrice: number;
};

const FullOrderItems = ({orders, totalPrice, shippingPrice}:FullOrderItemsProps) => {

    const fixedTotalPrice = parseFloat(totalPrice.toFixed(2));
    const finalPrice = fixedTotalPrice + shippingPrice;
    const theme = useTheme();

    return (
        (orders && totalPrice) && (
            <Box sx={{ }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5, color: theme.palette.lightColor.main }}>
                    Ordered Items
                </Typography>

                {orders.map((orderFromSeller) => (
                    <div key={orderFromSeller.id}>
                        {orderFromSeller.orderItems.map((orderItem: any) => (
                            <div key={orderItem.id}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, mb: 1 }}>
                                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                                        <img src={`${baseURL}${orderItem.product.imageName}`} alt={orderItem.product.name} style={{ width: "5rem" }} />
                                        <Box sx={{ color: theme.palette.info.main }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                                {orderItem.product.name}
                                            </Typography>
                                            <Typography variant="caption">{orderItem.product.seller.alias}</Typography>
                                            <Typography variant="caption">{`x ${orderItem.quantity}`}</Typography>
                                        </Box>
                                    </Box>
                                    <Typography sx={{color: theme.palette.info.main}} variant="body1">{`${(orderItem.product.price * orderItem.quantity).toFixed(2)} RON`}</Typography>
                                </Box>
                                <Divider sx={{backgroundColor: theme.palette.lightColor.main}}/>
                            </div>
                        ))}
                    </div>
                ))}

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, color: theme.palette.info.main }}>
                    <Typography variant="subtitle1">Subtotal</Typography>
                    <Typography variant="subtitle1">{`${fixedTotalPrice} RON`}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", color: theme.palette.info.main }}>
                    <Typography variant="subtitle1">Shipping payment</Typography>
                    <Typography variant="subtitle1">{`${shippingPrice} RON`}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", color:theme.palette.info.main, mt:1 }}>
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