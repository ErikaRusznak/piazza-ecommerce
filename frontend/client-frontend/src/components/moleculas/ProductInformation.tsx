import React, {useState} from "react";
import {useCart} from "../../../contexts/CartContext";
import {useAuth} from "../../../api/auth/AuthContext";
import {useAlert} from "../../../contexts/AlertContext";
import {useRouter} from "next/navigation";
import {Box, Button, Divider, Typography} from "@mui/material";
import useTheme from "@/theme/themes";
import QuantityInput from "@/components/atoms/QuantityInput";
import ProductSpecificInfo from "@/components/atoms/ProductSpecificInfo";
import AddRemoveWishlist from "@/components/atoms/AddRemoveWishlist";
import StyledButton from "@/components/atoms/StyledButton";

type ProductInformationProps = {
    description: string;
    price: number;
    category: string; // TODO- create category type (here is string but in general)
    producer: string; // TODO - same for producer
    city: string;
    productId: number;
}
const ProductInformation = ({description, price, category, producer, city, productId}: ProductInformationProps) => {
    const [quantity, setQuantity] = useState(1);
    const {updateCartItemQuantity} = useCart()
    const {isAuthenticated} = useAuth();
    // const {pushAlert, clearAlert} = useAlert()
    const router = useRouter();
    const theme = useTheme();
    const updateQuantity = (input: number) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity + input));
    }

    const addItemToCart = (productId: number, quantity: number) => {
        updateCartItemQuantity(productId, quantity)
    }

    const handleAddToCart = () => {
        if (isAuthenticated) {
            addItemToCart(productId, quantity);
            // pushAlert({
            //     type: "info",
            //     title: "Product Added To Cart",
            //     paragraph: "You will be redirected..."
            // })
            // setTimeout(() => {
            //     router.push("/account/cart");
            //     clearAlert();
            // }, 2000)
        } else {
            router.push("/login");
        }
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "25rem",
            [theme.breakpoints.down("md")]: {width: "20rem"},
        }}>
            <Typography variant="body1"
                        sx={{
                            mt: 1,
                            color: theme.palette.info.main,
                            ml: {xs: 1},
                        }}>
                {description}
            </Typography>
            <Typography variant="h6"
                        sx={{fontWeight: "bold", mt: 2, color: theme.palette.info.main,
                            ml: {xs: 1},}}
            >
                {price} RON
            </Typography>

            <Box sx={{mt: 3}}>
                <ProductSpecificInfo
                    label="Category"
                    information={category}
                />
                <ProductSpecificInfo
                    label="Producer"
                    information={producer}
                />
                <ProductSpecificInfo
                    label="City"
                    information={city}
                />

                <Box>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mx: {xs: 1},}}>
                        <Typography variant="body1" sx={{fontWeight: "bold", color: theme.palette.info.main,}}>
                            Quantity
                        </Typography>
                        <QuantityInput
                            quantity={quantity}
                            onQuantityChanged={updateQuantity}
                        />
                    </Box>
                    <Divider sx={{backgroundColor: theme.palette.lightColor.main, width: "full", my: 2}}/>
                </Box>
            </Box>
            <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
            <Box sx={{display: "flex", flexDirection: "column", gap: 1,
                [theme.breakpoints.down("md")]: {width: "19rem"},
                width: "25rem",
            }}>
                <StyledButton
                    fullWidth
                    variant="contained"
                    onClick={handleAddToCart}
                >
                    Add to cart
                </StyledButton>
                {isAuthenticated && (
                    <AddRemoveWishlist
                        productId={productId}
                    />
                )}
            </Box></Box>
        </Box>
    );
};

export default ProductInformation;