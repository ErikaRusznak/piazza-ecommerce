"use client";

import React, { useEffect, useState } from "react";
import {useCart} from "../../../contexts/CartContext";
import {useAuth} from "../../../api/auth/AuthContext";
import {useRouter} from "next/navigation";
import {addShippingAddress, getBuyerAddresses, updateShippingAddress} from "../../../api/entities/BuyerApi";
import {submitOrder} from "../../../api/entities/OrderApi";
import Link from "next/link";
import CartItemCard from "@/components/moleculas/cart/CartItemCard";
import CartSummary from "@/components/moleculas/cart/CartSummary";
import ShippingAddressesComponent from "@/components/moleculas/ShippingAddressesComponent";
import AddressFormModal from "@/components/organisms/modals/AddressFormModal";

const CheckoutPage = () => {
    const {allCartItems, numberOfCartItems, cartTotalPrice, refreshCart} = useCart()
    // const {pushAlert, clearAlert} = useAlert()

    const [shippingAddresses, setShippingAddresses] = useState([])
    const [selectedShippingAddress, setSelectedShippingAddress] = useState<any>(null)
    const shippingPrice = 10

    const {username} = useAuth()
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const getShippingAddresses = () => {
        getBuyerAddresses()
            .then(
                (response) => {
                    setShippingAddresses(response.data);
                    // setSelectedShippingAddress(response.data[0])  //todo modify
                }
            )
            .catch(
                (err) => console.log(err)
            );
    };

    const handleAddressSelected = (shippingAddress: any) => {
        setSelectedShippingAddress(shippingAddress);
        // if (!!shippingAddress) {
        //     clearAlert()
        // }
    };

    const handleAddAddress = () => {
        const obj = {
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
        }
        setSelectedShippingAddress(obj);
        toggleModal();
    };

    const handleSaveForm = (values: any) => {
        if (values.id === 0) {
            addShippingAddress(values)
                .then(() => {getShippingAddresses();}
                )
                .catch((err) => console.log(err))
        } else if (JSON.stringify(values) !== JSON.stringify(selectedShippingAddress)) {
            updateShippingAddress(values)
                .then(() => {getShippingAddresses()}
                )
                .catch((err) => console.log(err))
        }
        setIsModalOpen(false);
    }

    const handlePlaceOrder = ()=> {
        const checkoutItems = allCartItems?.map(item => {
            return {
                productId: item.product.id,
                quantity: item.quantity
            }
        });

        if (!!selectedShippingAddress) {
            submitOrder(selectedShippingAddress, checkoutItems, username)
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
                            router.push(`/order-successful/${orderId}`);
                        }, 2000)
                    }
                )
                .catch((e) => {console.log(e)})
        } else {
            // pushAlert({
            //     type: 'danger',
            //     title: "Validation Error",
            //     paragraph: "Can't place an order without an address. Please select address or add a new one."
            // })
        }
    };

    useEffect(() => {
        if (username) {
            getShippingAddresses();
        }
    }, [username]);

    return (
        <div className="">

            <div
                className="sm:block flex justify-center mt-10 md:space-x-8 lg:space-x-8 xl:space-x-8 2xl:space-x-8 mx-8">

                <div className="sm:mt-8 sm:w-full w-1/2 max-w-lg sm:mx-auto">
                    <Link href="/shopping-cart" className="text-sm font-semibold leading-6 text-inherit dark:text-inherit">
                        <span aria-hidden="true">&larr;</span> Cart
                    </Link>

                    <p className="text-xl font-bold mt-4">Order Summary</p>
                    {numberOfCartItems !== 0 &&
                        <div className="mt-6">
                            {allCartItems?.map((item) => (
                                <CartItemCard key={item.id} item={item} isModifiable={false}/>
                            ))}
                        </div>
                    }
                </div>

                <div className="w-1/2 max-w-lg sm:w-full sm:mx-auto sm:mt-10 relative">

                    <div className="md:mt-6 lg:mt-6 xl:mt-6 2xl:mt-6">
                        <ShippingAddressesComponent shippingAddresses={shippingAddresses}
                                                    selectedShippingAddress={selectedShippingAddress}
                                                    onAddressSelected={handleAddressSelected}
                                                    // toggleModal={() => toggleModal(selectedShippingAddress)}
                                                    toggleModal={() => toggleModal()}
                                                    onAddAddress={handleAddAddress}
                        />
                    </div>

                    <CartSummary cartTotalPrice={cartTotalPrice} shippingPrice={shippingPrice}>
                        <button onClick={handlePlaceOrder}
                                className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Place
                            Order
                        </button>
                    </CartSummary>

                </div>
            </div>

            <AddressFormModal
                toggleModal={toggleModal}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onSaveForm={handleSaveForm}
                shippingAddress={selectedShippingAddress}
            />
        </div>
    );
};

export default CheckoutPage;