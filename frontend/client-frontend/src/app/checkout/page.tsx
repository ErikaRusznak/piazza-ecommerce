"use client";

import React, {useEffect, useRef, useState} from "react";
import {useCart} from "../../../contexts/CartContext";
import {useAuth} from "../../../api/auth/AuthContext";
import {useRouter} from "next/navigation";
import {addShippingAddress, getBuyerAddresses, updateShippingAddress} from "../../../api/entities/BuyerApi";
import {submitOrder} from "../../../api/entities/OrderApi";
import CartItemCard from "@/components/moleculas/cart/CartItemCard";
import CartSummary from "@/components/moleculas/cart/CartSummary";
import ShippingAddressesComponent from "@/components/moleculas/ShippingAddressesComponent";
import AddressFormModal from "@/components/organisms/modals/AddressFormModal";
import MainLayout from "@/components/templates/MainLayout";
import {Container, FormControlLabel, Grid, Radio, RadioGroup, Typography, useMediaQuery} from "@mui/material";
import useTheme from "@/theme/themes";
import StyledButton from "@/components/atoms/StyledButton";
import BreadcrumbsComponent from "@/components/atoms/Breadcrumbs";
import Stripe from "react-stripe-checkout";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import {Elements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js";
import {baseURL} from "../../../api/ApiClient";

export type AddressType = {
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
};
export type ShippingAddressType = {
    address: AddressType;
    firstName: string;
    id: number;
    lastName: string;
    telephone: string;
}
const CheckoutPage = () => {
    const {allCartItems, numberOfCartItems, cartTotalPrice, refreshCart} = useCart()
    // const {pushAlert, clearAlert} = useAlert()

    const [shippingAddresses, setShippingAddresses] = useState<ShippingAddressType[]>([]);
    const [selectedShippingAddress, setSelectedShippingAddress] = useState<ShippingAddressType | null>(null);
    const [editingAddress, setEditingAddress] = useState<ShippingAddressType | null>(null);
    const [paymentType, setPaymentType] = useState('CASH');
    const stripeRef = useRef(null);

    const shippingPrice = 10;

    const {username} = useAuth()
    const router = useRouter();
    const theme = useTheme();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const nullObject = {
        id: 0,
        address: {
            country: "Romania",
            state: "",
            city: "",
            addressLine1: "",
            addressLine2: "",
            zipCode: "",
        },
        firstName: "",
        lastName: "",
        telephone: ""
    };
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const getShippingAddresses = () => {
        getBuyerAddresses()
            .then(
                (response) => {
                    setShippingAddresses(response.data);
                    setSelectedShippingAddress(response.data[0])
                })
            .catch(
                (err) => console.log(err)
            );
    };

    const handleAddressSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedId = parseInt(event.target.value, 10); // Convert the value to a number
        const selectedAddress = shippingAddresses.find((address) => address.id === selectedId);
        setSelectedShippingAddress(selectedAddress || null);
        // if (!!shippingAddress) {
        //     clearAlert()
        // }
    };
    const handleEditAddress = (address: ShippingAddressType) => {
        setEditingAddress(address);
        toggleModal();
    };

    const handleAddAddress = () => {
        setSelectedShippingAddress(nullObject);
        toggleModal();
    };

    const handleSaveForm = (values: ShippingAddressType) => {
        if (values.id === 0) {
            addShippingAddress(values)
                .then(() => {
                    getShippingAddresses()
                })
                .catch((err) => console.log(err))
        } else if (JSON.stringify(values) !== JSON.stringify(selectedShippingAddress)) {
            updateShippingAddress(values)
                .then(() => {
                    getShippingAddresses()
                })
                .catch((err) => console.log(err))
        }
        setIsModalOpen(false);
    };

    const handlePlaceOrder = () => {
        const checkoutItems = allCartItems?.map(item => {
            return {
                productId: item.product.id,
                quantity: item.quantity
            }
        });

        if (!!selectedShippingAddress) {
            submitOrder(selectedShippingAddress, checkoutItems, username, paymentType)
                .then(
                    (response) => {
                        const orderId = response.data.id;
                        // pushAlert({
                        //     type: "success",
                        //     title: "Order Placed",
                        //     paragraph: "You will be redirected..."
                        // })
                        setTimeout(() => {
                            refreshCart();
                            router.push(`/order-successful/${orderId}`);}, 2000)
                    })
                .catch((e) => {
                    console.log(e)
                })
        } else {
            // pushAlert({
            //     type: 'danger',
            //     title: "Validation Error",
            //     paragraph: "Can't place an order without an address. Please select address or add a new one."
            // });
        }
    };

    useEffect(() => {
        if (username) {
            getShippingAddresses();}
        }, [username]);

    const belowMedSize = useMediaQuery(theme.breakpoints.down("md"));
    const breadcrumbsLinks = [
        {label: "Home", link: "/"},
        {label: "Cart", link: "/shopping-cart"},
        {label: "Checkout", link: ""}];

    async function handleToken(token: { id: any; }) {
        await axios.post(`${baseURL}/payment/charge`, "", {
            headers: {
                token: token.id,
                amount: cartTotalPrice + 10,
            },
        }).then(() => {
            alert("Payment Success");
            handlePlaceOrder();
        }).catch((error) => {
            alert(error);
        });
    };

    const handlePaymentTypeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPaymentType(event.target.value);
    };

    return (
        <MainLayout>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <BreadcrumbsComponent links={breadcrumbsLinks}/>

                        <Typography variant="h5" fontWeight="bold" mt={2} color={theme.palette.info.main}>
                            Order Summary
                        </Typography>
                        {numberOfCartItems !== 0 && (
                            <Grid container spacing={2} mt={2}>
                                {allCartItems?.map((item) => (
                                    <Grid item key={item.id} xs={12}>
                                        <CartItemCard item={item} isModifiable={false}/>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2} mt={belowMedSize ? -3 : 2}>
                            <Grid item xs={12}>
                                <ShippingAddressesComponent
                                    shippingAddresses={shippingAddresses}
                                    selectedShippingAddress={selectedShippingAddress}
                                    onAddressSelected={handleAddressSelected}
                                    toggleModal={() => toggleModal()}
                                    onAddAddress={handleAddAddress}
                                    onEdit={handleEditAddress}
                                />
                            </Grid>
                            <Typography variant="h6">Payment Method</Typography>
                            <RadioGroup value={paymentType} onChange={handlePaymentTypeChange}>
                                <FormControlLabel value="CASH" control={<Radio/>} label="Cash"/>
                                <FormControlLabel value="CARD" control={<Radio/>} label="Card"/>
                            </RadioGroup>

                            <Grid item xs={12}>
                                <CartSummary cartTotalPrice={cartTotalPrice} shippingPrice={shippingPrice}>
                                    {paymentType === "CASH" ? (
                                        <StyledButton
                                            fullWidth
                                            disabled={shippingAddresses.length === 0 || !selectedShippingAddress}
                                            variant="contained"
                                            sx={{mt: 3}}
                                            onClick={handlePlaceOrder}
                                        >
                                            Place order
                                        </StyledButton>
                                    ): (
                                        <StripeCheckout
                                            stripeKey="pk_test_51PHVHnHam90jk2a1epzt3sP93OEHHwTgWxhOwYSQDCCnjT2SEJtzSTJ2JyVVfyI8FxnaP3cgnS2ZCNKTRPm4Bgjq00671w9qWP"
                                            token={handleToken}
                                        >
                                            <StyledButton
                                                fullWidth
                                                disabled={shippingAddresses.length === 0 || !selectedShippingAddress}
                                                variant="contained"
                                                sx={{mt: 3}}
                                            >
                                                Place order
                                            </StyledButton>
                                        </StripeCheckout>
                                    )}

                                </CartSummary>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <AddressFormModal
                    toggleModal={toggleModal}
                    isModalOpen={isModalOpen}
                    onSaveForm={handleSaveForm}
                    shippingAddress={editingAddress ?? nullObject}
                    setEditingAddress={setEditingAddress}
                />

            </Container>
        </MainLayout>
    );
};
export default CheckoutPage;