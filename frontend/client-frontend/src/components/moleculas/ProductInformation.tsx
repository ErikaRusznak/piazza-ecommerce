import React, {useState} from "react";
import {useCart} from "../../../contexts/CartContext";
import {useAuth} from "../../../api/auth/AuthContext";
import {useAlert} from "../../../contexts/AlertContext";
import {useNavigate} from "react-router";
import {useRouter} from "next/navigation";
import {Box, Button, Divider, Typography} from "@mui/material";
import useTheme from "@/theme/themes";
import QuantityInput from "@/components/atoms/QuantityInput";
import ProductSpecificInfo from "@/components/atoms/ProductSpecificInfo";
import AddRemoveWishlist from "@/components/atoms/AddRemoveWishlist";

type ProductInformationProps = {
    description: string;
    price: number;
    category: string; // TODO- create category type (here is string but in general)
    producer: string; // TODO - same for producer
    city: string;
    productId: number;
}
const ProductInformation = ({description, price, category, producer, city, productId} : ProductInformationProps) => {
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

    const gapFavButton = isAuthenticated ? "5" : "0";
    return (
        <Box sx={{ display: "flex", flexDirection: "column"}}>
            <Typography variant="body1" sx={{
                mt: 10, xs: {mt: 4}, sm: {mt: 8},
                color: theme.palette.info.main,
            }}>
                {description}
            </Typography>
            <Typography variant="body1" sx={{fontWeight: 500, mt: 3 }}>{price} RON</Typography>


            <Box sx={{mt: 5}}>
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
                        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Typography variant="body1" sx={{fontWeight: "bold", color: theme.palette.info.main,}}>
                                Quantity
                            </Typography>
                            <Box sx={{display: "flex"}}>
                                <QuantityInput
                                    quantity={quantity}
                                    onQuantityChanged={updateQuantity}
                                />
                            </Box>
                        </Box>
                        <Divider sx={{backgroundColor: "red", width: "full", my: 2}}/>
                    </Box>


            </Box>
                <Box sx={{display: "flex", gap: gapFavButton}}>
                    <AddRemoveWishlist
                        productId={productId}
                    />
                    <Button
                        sx={{
                            fontWeight: 500, borderRadius: "14px", color: "blue", width: "full", py: 3, mt: 6, border: "1px solid yellow"
                        }}
                        onClick={() => handleAddToCart()}>
                        Add to cart
                    </Button>
                </Box>
        </Box>
    );
};

export default ProductInformation;