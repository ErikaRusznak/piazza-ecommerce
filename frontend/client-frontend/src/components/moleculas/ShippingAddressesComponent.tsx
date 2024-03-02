import React from "react";
import {RadioGroup} from "@mui/material";
import {ArrowForwardIcon} from "@/components/atoms/icons";
import AddressComponent from "@/components/atoms/AddressComponent";

type ShippingAddressesComponentProps = {
    shippingAddresses: any[];
    selectedShippingAddress: any;
    onAddressSelected: any;
    toggleModal: () => void;
    onAddAddress: () => void;
}
const ShippingAddressesComponent = ({shippingAddresses, selectedShippingAddress, onAddressSelected, toggleModal, onAddAddress}:ShippingAddressesComponentProps) => {

    return (
        <>
            <RadioGroup value={selectedShippingAddress} onChange={onAddressSelected}>
                <div className="flex justify-between items-end">
                    <RadioGroup.Label className="text-xl font-bold">
                        Addresses
                    </RadioGroup.Label>

                    <ArrowForwardIcon
                        onClick={onAddAddress}
                    />

                </div>
                {shippingAddresses.map((item) => (
                    <RadioGroup.Option key={item.id} value={item} className="mt-6">
                        {({ checked }) => (
                            <AddressComponent item={item} checked={checked} toggleModal={toggleModal}/>
                        )}
                    </RadioGroup.Option>
                ))}
            </RadioGroup>
        </>
    );
};

export default ShippingAddressesComponent;