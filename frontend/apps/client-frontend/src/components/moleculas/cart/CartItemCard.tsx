import React from "react";
import {useCart} from "../../../../contexts/CartContext";
import {baseURL} from "components";
import QuantityInput from "@/components/atoms/QuantityInput";
import {Box, Typography, useMediaQuery} from "@mui/material";
import useTheme from "@/theme/themes";
import {Delete} from "@/components/atoms/icons";
import {useRouter} from "next/navigation";

type CartItemCardProps = {
    item: any;
    isModifiable: boolean;
};

const CartItemCard = ({item, isModifiable}: CartItemCardProps) => {
    const theme = useTheme();
    const {updateCartItemQuantity, deleteCartItem} = useCart();
    const belowSmallSize = useMediaQuery(theme.breakpoints.down("sm"));

    const totalPricePerItem = Math.round(((item.product.price * item.quantity) + Number.EPSILON) * 100) / 100;

    const handleQuantityChange = (newQuantity: number) => {
        updateCartItemQuantity(item.product.id, newQuantity);
    };

    const router = useRouter();

    return (
        <Box sx={{
            border: "1px solid #a5b4fc",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: theme.palette.background.default,
            mb: 2,
            p: 3,
            borderRadius: "14px",
        }}>
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                position: "relative",
            }}
        >

            <Box
                sx={{
                    flex: "0 0 120px",
                }}
            >
                <img
                    src={`${baseURL}${item.product.imageName}`}
                    alt=""
                    style={{
                        borderRadius: "14px",
                        width: "100%",
                        height: "auto",
                        display: "block",
                        cursor: "pointer",
                    }}
                    onClick={() => router.push(`/shop/${item.product.id}`)}
                />
            </Box>
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    ml: 3,
                }}>
                <Box>
                    <Typography variant="h6" fontWeight="bold" color={theme.palette.info.main}
                                onClick={() => router.push(`/shop/${item.product.id}`)}
                                sx={{cursor: "pointer","&:hover": {textDecoration: "underline"}}}
                    >
                        {item.product.name}
                    </Typography>
                    <Typography variant="body2" mt={1} color={theme.palette.info.main}>
                        {belowSmallSize ? "" : `Price per ${item.product.unitOfMeasure}: `}
                        {item.product.price} RON
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {!belowSmallSize && (
                        <>
                            {isModifiable && (
                                <Box sx={{mt: 2}}>
                                    <QuantityInput quantity={item.quantity}
                                                   onQuantityChanged={handleQuantityChange}
                                                   availableQuantity={item.product.quantity}
                                    />
                                </Box>
                            )}
                            <Box sx={{display: "flex", alignItems: "flex-end", gap: 1}}>
                                <Typography variant="body2" color={theme.palette.info.main}
                                            sx={{
                                                position: "absolute",
                                                bottom: 0,
                                                right: 0,

                                            }}>
                                    Total: {totalPricePerItem} RON
                                </Typography>
                                {isModifiable && (
                                    <Delete
                                        sx={{
                                            color: theme.palette.primary.main, cursor: "pointer",
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            "&:hover": {
                                                color: "red",
                                            },
                                        }}
                                        onClick={() => deleteCartItem(item.product.id)}
                                    />
                                )}
                            </Box>
                        </>
                    )}
                </Box>
            </Box>

        </Box>
            {belowSmallSize && (
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    alignItems: "flex-end", gap: 1,
                }}>
                    {isModifiable && (
                        <Box sx={{mt:1}}>
                            <QuantityInput quantity={item.quantity}
                                           onQuantityChanged={handleQuantityChange}
                                           availableQuantity={item.product.quantity}
                            />
                        </Box>
                    )}
                    <Box sx={{display: "flex", alignItems: "flex-end", gap: 1}}>
                        <Typography variant="body2" color={theme.palette.info.main}>
                            Total: {totalPricePerItem} RON
                        </Typography>
                        {isModifiable && (
                            <Delete
                                sx={{
                                    color: theme.palette.primary.main, cursor: "pointer",
                                    "&:hover": {
                                        color: "red",
                                    },
                                }}
                                onClick={() => deleteCartItem(item.product.id)}
                            />
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default CartItemCard;