import React, {useEffect, useState} from 'react';
import {Box, Typography, useMediaQuery} from '@mui/material';
import {useRouter} from "next/navigation";
import {useCart} from "../../../../contexts/CartContext";
import {useAlert, useAuth} from "components";
import {getProductByIdApi} from "components";
import {BaseModal} from "ui";
import {baseURL} from "components";
import {ProductRating} from "ui";
import {QuantityInput} from "ui";
import {useTheme} from "@mui/material/styles";
import {StyledButton} from "ui";
import {useThemeToggle} from "ui";

type ProductAddToCartModalProps = {
    isModalOpen: boolean;
    toggleModal: (productId: number) => void;
    setIsModalOpen: (value: boolean) => void;
    productId: number;
};

const ProductAddToCartModal: React.FC<ProductAddToCartModalProps> = ({
                                                                         isModalOpen,
                                                                         toggleModal,
                                                                         setIsModalOpen,
                                                                         productId,
                                                                     }) => {
    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const smallScreenSize = useMediaQuery(theme.breakpoints.down("sm"));
    const router = useRouter();
    const {pushAlert} = useAlert();

    const [product, setProduct] = useState<any | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const {updateCartItemQuantity} = useCart();

    const {isAuthenticated} = useAuth();

    const isRatingDisplayed = true;

    const getProductById = (productId: number) => {
        getProductByIdApi(productId)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => console.error(err));
    };

    const addItemToCart = (productId: number, quantity: number) => {
        updateCartItemQuantity(productId, quantity);
    };

    useEffect(() => {
        if (productId) {
            getProductById(productId);
            setQuantity(1);
        }
    }, [productId]);

    const updateQuantity = (input: number) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity + input));
    };

    const handleAddToCart = () => {
        if (isAuthenticated) {
            addItemToCart(product.id, quantity);
            pushAlert({
                type: "success",
                title: "Cart updated",
                paragraph: "This product has been added to your cart."
            });
        } else {
            router.push('/login');
        }
        setIsModalOpen(false);
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
        <BaseModal isModalOpen={isModalOpen} toggleModal={() => toggleModal(productId)}>
            {product &&
                <Box>
                    <Box sx={{
                        backgroundColor: isDark ? theme.palette.background.lighter : theme.palette.background.default,
                        px: 4, py: 2,
                        borderTopLeftRadius: "14px",
                        borderTopRightRadius: "14px",
                        border: "1px solid #a5b4fc"
                    }}>
                        <Box>
                            <Box sx={{display: "flex", flexDirection: "column"}}>
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: !smallScreenSize ? "space-between" : "center",
                                }}
                                >
                                    <Box>
                                        <img src={`${baseURL}${product.imageName}`}
                                             alt=""
                                             style={{
                                                 width: "120px",
                                                 margin: "auto",
                                                 borderRadius: "14px",
                                             }}
                                        />
                                    </Box>
                                    {!smallScreenSize && (
                                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <QuantityInput
                                                quantity={quantity}
                                                onQuantityChanged={updateQuantity}
                                                availableQuantity={product.quantity}
                                                userRoleIsClient={true}
                                            />
                                        </Box>
                                    )}

                                </Box>
                                <Box sx={{
                                    mt: 1, display: smallScreenSize ? "flex" : "block",
                                    justifyContent: smallScreenSize ? "center" : ""
                                }}>
                                    <ProductRating
                                        rating={product.productRating}
                                        isRatingDisplayed={isRatingDisplayed}
                                        viewType="simple"
                                    />
                                </Box>
                                {product.availability === "FEW_ITEMS_LEFT" ? (
                                    <Typography
                                        sx={{mt:1,}}
                                        color={"rgba(255, 165, 0)"}
                                    >
                                        There are {product.quantity} items left!
                                    </Typography>
                                ): null}
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderTop: "1px solid #a5b4fc"
                                }}>
                                    <Box sx={{mt: 1, mr: 2}}>
                                        <Typography variant="h6" sx={{
                                            fontWeight: "bold",
                                            color: theme.palette.info.main,
                                        }}>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{color: theme.palette.info.main}}>
                                            Price per {getUnitOfMeasure(product.unitOfMeasure)}: {product.price} RON
                                        </Typography>

                                    </Box>
                                    {!smallScreenSize && (
                                        <Box sx={{display: "flex", alignItems: "center"}}>
                                            <Typography variant="body1" sx={{color: theme.palette.info.main}}>
                                                {(product.price * quantity).toFixed(2)} RON
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                                {smallScreenSize && (
                                    <>
                                        <Box sx={{display: "flex", mt: 2, alignItems: "center", justifyContent: "center"}}>
                                            <QuantityInput
                                                quantity={quantity}
                                                onQuantityChanged={updateQuantity}
                                                availableQuantity={product.quantity}
                                            />
                                        </Box>
                                        <Box sx={{display: "flex", alignItems: "center", mt: 2}}>
                                            <Typography variant="body1" sx={{color: theme.palette.info.main}}>
                                                Total price: {(product.price * quantity).toFixed(2)} RON
                                            </Typography>
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            border: "1px solid #a5b4fc",
                            px: 2, py: 1,
                            backgroundColor: isDark ? theme.palette.background.lighter : theme.palette.background.default,
                            borderBottomLeftRadius: "14px",
                            borderBottomRightRadius: "14px",
                        }}>
                        <StyledButton
                            variant="contained"
                            sx={{backgroundColor: theme.palette.background.lighter, border: "1px solid #a5b4fc"}}
                            onClick={handleAddToCart}
                        >
                            Add to cart
                        </StyledButton>
                    </Box>
                </Box>
            }
        </BaseModal>
    );
};

export default ProductAddToCartModal;
