import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {useRouter} from "next/navigation";
import {useCart} from "../../../../contexts/CartContext";
import {useAuth} from "../../../../api/auth/AuthContext";
import {getProductByIdApi} from "../../../../api/entities/ProductApi";
import BaseModal from "@/components/templates/BaseModal";
import {baseURL} from "../../../../api/ApiClient";
import ProductRating from "@/components/moleculas/ProductRating";
import QuantityInput from "@/components/atoms/QuantityInput";
import useTheme from "@/theme/themes";
import StyledButton from "@/components/atoms/StyledButton";

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
    const router = useRouter();

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
            .catch((err) => console.log(err));
    };

    const addItemToCart = (productId: string, quantity: number) => {
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
        } else {
            router.push('/login');
        }
        setIsModalOpen(false);
    };

    const theme = useTheme();

    return (
        <BaseModal isModalOpen={isModalOpen} toggleModal={() => toggleModal(productId)}>
            {product &&
                <Box>
                    <Box sx={{
                        backgroundColor: theme.palette.background.lighter,
                        px: 4, pb: 2, pt: 5,
                        borderTopLeftRadius: "14px",
                        borderTopRightRadius: "14px",
                        border: "1px solid #93B1A6"
                    }}>
                        <Box>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>

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

                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <QuantityInput
                                            quantity={quantity}
                                            onQuantityChanged={updateQuantity}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{mt: 1}}>
                                    <ProductRating
                                        rating={product.productRating}
                                        isRatingDisplayed={isRatingDisplayed}
                                        viewType="simple"
                                    />
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderTop: "1px solid #93B1A6"
                                }}>
                                    <Box sx={{ mt: 1, mr: 2 }}>
                                        <Typography variant="h6" sx={{
                                            fontWeight: "bold",
                                            color: theme.palette.info.main,
                                        }}>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{color: theme.palette.info.main}}>
                                            Price per {product.unitOfMeasure}: {product.price} RON
                                        </Typography>

                                    </Box>
                                    <Box sx={{display: "flex", alignItems: "center"}}>
                                        <Typography variant="body1" sx={{ color: theme.palette.info.main }}>
                                            {(product.price * quantity).toFixed(2)} RON
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            border: "1px solid #93B1A6",
                            px: 2, py: 1,
                            backgroundColor: theme.palette.background.lighter,
                            borderBottomLeftRadius: "14px",
                            borderBottomRightRadius: "14px",
                        }}>
                        <StyledButton
                            variant="contained"
                            sx={{backgroundColor: theme.palette.background.lighter, border: "1px solid #93B1A6"}}
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
