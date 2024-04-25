import React, {useEffect, useState} from "react";
import {
    Box,
    Typography,
} from "@mui/material";;
import useTheme from "@/theme/themes";
import StyledButton from "@/components/atoms/StyledButton";
import {AddCircleOutlineIcon} from "@/components/atoms/icons";
import {addShippingAddress, getBuyerAddresses, updateShippingAddress} from "../../../../api/entities/BuyerApi";
import {ShippingAddressType} from "@/app/checkout/page";
import AddressComponent from "@/components/atoms/AddressComponent";
import AddressFormModal from "@/components/organisms/modals/AddressFormModal";

type AddressManagementProps = {

};

const AddressManagement = ({  }: AddressManagementProps) => {
    const theme = useTheme();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shippingAddresses, setShippingAddresses] = useState<ShippingAddressType[]>([]);
    const [editingAddress, setEditingAddress] = useState<ShippingAddressType | null>(null);


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }
    const getShippingAddresses = () => {
        getBuyerAddresses()
            .then(
                (response) => {
                    setShippingAddresses(response.data);
                }
            )
            .catch(
                (err) => console.log(err)
            );
    };

    const handleSaveForm = (values: ShippingAddressType) => {
        if (values.id === 0) {
            addShippingAddress(values)
                .then(() => {
                    getShippingAddresses()
                })
                .catch((err) => console.log(err))
        } else {
            updateShippingAddress(values)
                .then(() => {
                    getShippingAddresses()
                })
                .catch((err) => console.log(err))
        }
        setIsModalOpen(false);
    };

    const handleAddAddress = () => {
        toggleModal();
    };

    useEffect(() => {
        getShippingAddresses();
    }, []);

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

    const handleEditAddress = (address: ShippingAddressType) => {
        setEditingAddress(address);
        toggleModal();
    };

    return (
        <Box sx={{padding: theme.spacing(2), mt:2, border: "1px solid #a5b4fc", borderRadius: "14px"}}>
            <Box sx={{display: "flex", gap: 2, alignItems: "center", mb: 2}}>
                <Typography variant="h5" sx={{color: theme.palette.info.main}}>Address Management</Typography>
                <StyledButton
                    variant="contained"
                    sx={{gap: 2}}
                    onClick={handleAddAddress}
                >
                    <AddCircleOutlineIcon/>
                    <Typography sx={{textTransform: "none"}}>Add address</Typography>
                </StyledButton>

            </Box>
            {shippingAddresses.map((item) => (
                <Box key={item.id}
                     sx={{
                         border: `1px solid ${theme.palette.background.lighter}`,
                         borderRadius: "16px",
                         p: 2,
                         mb:1,
                         fontWeight: "medium",
                         shadow:  "none",
                         backgroundColor: theme.palette.background.default,
                         "&:hover": {
                             border:  "1px solid #a5b4fc" ,
                         },
                         position: "relative",
                         cursor: "pointer",
                     }}
                >
                    <AddressComponent item={item}
                                      toggleModal={toggleModal}
                                      onEdit={handleEditAddress}
                    />
                </Box>
            ))}
            <AddressFormModal
                toggleModal={toggleModal}
                isModalOpen={isModalOpen}
                onSaveForm={handleSaveForm}
                shippingAddress={editingAddress ?? nullObject}
                setEditingAddress={setEditingAddress}
            />

        </Box>
    );
};

export default AddressManagement;
