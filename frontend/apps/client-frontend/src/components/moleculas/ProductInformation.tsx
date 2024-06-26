import React, {useState} from "react";
import {useCart} from "../../../contexts/CartContext";
import { useAuth } from "components";
import {useAlert} from "components";
import {useRouter} from "next/navigation";
import {Box, Divider, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {QuantityInput} from "ui";
import {ProductSpecificInfo} from "ui";
import AddRemoveWishlist from "@/components/atoms/AddRemoveWishlist";
import {StyledButton} from "ui";

type ProductInformationProps = {
    description: string;
    price: number;
    category: string;
    producer: string;
    city: string;
    productId: number;
    availability: string;
    availableQuantity: number;
    unitOfMeasure: string;
    updateProductAvailability: (newAvailability: string, remainingQuantity: number) => void;
}
const ProductInformation = ({unitOfMeasure, description, price, category, producer, city, productId, availability, availableQuantity, updateProductAvailability}: ProductInformationProps) => {
    const [quantity, setQuantity] = useState(1);
    const {updateCartItemQuantity} = useCart()
    const {isAuthenticated} = useAuth();
    const {pushAlert} = useAlert();
    const router = useRouter();
    const theme = useTheme();
    const updateQuantity = (input: number) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity + input));
    }

    const addItemToCart = (productId: number, quantity: number) => {
        updateCartItemQuantity(productId, quantity)
    }

    const updateAvailability = () => {
        const remainingQuantity = availableQuantity - quantity;
        let newAvailability: string;
        if (remainingQuantity === 0) {
            newAvailability = "OUT_OF_STOCK";
        } else if (remainingQuantity < 5) {
            newAvailability = "FEW_ITEMS_LEFT";
        } else {
            newAvailability = "AVAILABLE";
        }
        updateProductAvailability(newAvailability, remainingQuantity);
    };

    const handleAddToCart = () => {
        if (isAuthenticated) {
            addItemToCart(productId, quantity);
            updateAvailability();
            pushAlert({
                type: "success",
                title: "Cart updated",
                paragraph: "This product has been added to your cart."
            });
        } else {
            router.push("/login");
        }
    };

    const getUnitOfMeasure = (unitOfMeasure: string) => {
        switch (unitOfMeasure) {
            case "KILOGRAM":
                return "kilogram";
            case "ONE_HUNDRED_GRAM":
                return "100 grams";
            case "ONE_UNIT":
                return "unit";
            default:
                return "Wrong unit of measure";
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
                {price} RON per {getUnitOfMeasure(unitOfMeasure)}
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
                            availableQuantity={availableQuantity}
                            userRoleIsClient={true}
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
                    disabled={availability === "OUT_OF_STOCK"}
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