import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Button, Box } from '@mui/material';
import {useRouter} from "next/navigation";
import {useCart} from "../../../../contexts/CartContext";
import {useAuth} from "../../../../api/auth/AuthContext";
import {getProductByIdApi} from "../../../../api/entities/ProductApi";
import BaseModal from "@/components/templates/BaseModal";
import {baseURL} from "../../../../api/ApiClient";
import ProductRating from "@/components/moleculas/ProductRating";
import QuantityInput from "@/components/atoms/QuantityInput";

type ProductAddToCartModalProps = {
    isModalOpen: boolean;
    toggleModal: (productId: number) => void;
    setIsModalOpen: (value: boolean) => void;
    productId: number;
};

const ModalContentWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#0F172A' : 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    transition: 'all 300ms ease-in-out',
}));

const ProductAddToCartModal: React.FC<ProductAddToCartModalProps> = ({
                                                                         isModalOpen,
                                                                         toggleModal,
                                                                         setIsModalOpen,
                                                                         productId,
                                                                     }) => {
    const router = useRouter();

    const [product, setProduct] = useState<any | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const { updateCartItemQuantity } = useCart();

    const { isAuthenticated } = useAuth();

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

    return (
        <BaseModal isModalOpen={isModalOpen} toggleModal={() => toggleModal(productId)}>
            {product && (
                <ModalContentWrapper>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <img
                                        src={`${baseURL}${product.imageName}`}
                                        alt=""
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '8px 8px 0 0',
                                        }}
                                    />
                                </div>
                                <div>
                                    <QuantityInput quantity={quantity} onQuantityChanged={updateQuantity} />
                                </div>
                            </div>
                            <div>
                                <h2>{product.name}</h2>
                                <p>
                                    Price per {product.unitOfMeasure}: {product.price} RON
                                </p>
                                <div>
                                    <ProductRating
                                        rating={product.productRating}
                                        isRatingDisplayed={isRatingDisplayed}
                                        viewType="simple"
                                    />
                                </div>
                                <div>
                                    <p>{product.seller.city}</p>
                                    <p>{product.seller.alias}</p>
                                </div>
                            </div>
                            <div>
                                <p>{(product.price * quantity).toFixed(2)} RON</p>
                            </div>
                        </div>
                        <div>
                            <Button
                                type="button"
                                onClick={() => handleAddToCart()}
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'linear-gradient(to right, #4f93ce, #6b66b4, #6b66b4)',
                                    '&:hover': {
                                        backgroundColor: 'linear-gradient(to bottom right, #4f93ce, #6b66b4, #6b66b4)',
                                    },
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    px: '12px',
                                    py: '8px',
                                    cursor: 'pointer',
                                    outline: 'none',
                                }}
                            >
                                Add to cart
                            </Button>
                        </div>
                    </div>
                </ModalContentWrapper>
            )}
        </BaseModal>
    );
};

export default ProductAddToCartModal;
