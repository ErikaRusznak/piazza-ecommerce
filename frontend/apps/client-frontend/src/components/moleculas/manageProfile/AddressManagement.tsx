import React, {useEffect, useState} from "react";
import {
    Box,
    Typography,
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {StyledButton} from "ui";
import {AddCircleOutlineIcon} from "@/components/atoms/icons";
import {addShippingAddress, getBuyerAddresses, updateShippingAddress} from "../../../../api/entities/BuyerApi";
import {ShippingAddressType} from "@/app/checkout/page";
import AddressComponent from "@/components/atoms/AddressComponent";
import AddressFormModal from "@/components/organisms/modals/AddressFormModal";
import {useThemeToggle} from "ui";
import {useAlert} from "components";

type AddressManagementProps = {

};

const AddressManagement = ({  }: AddressManagementProps) => {
    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shippingAddresses, setShippingAddresses] = useState<ShippingAddressType[]>([]);
    const [editingAddress, setEditingAddress] = useState<ShippingAddressType | null>(null);
    const {pushAlert} = useAlert();

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
                    getShippingAddresses();
                    pushAlert({
                        type: "success",
                        title: "Add address",
                        paragraph: "A new shipping address was added successfully!"
                    });
                })
                .catch((err) => {
                    console.error(err);
                    pushAlert({
                        type: "error",
                        title: "Add address",
                        paragraph: "Could not add a new shipping address."
                    });
                })
        } else {
            updateShippingAddress(values)
                .then(() => {
                    getShippingAddresses();
                    pushAlert({
                        type: "success",
                        title: "Update address",
                        paragraph: "The shipping address was updated successfully!"
                    });
                })
                .catch((err) => {
                    console.error(err);
                    pushAlert({
                        type: "error",
                        title: "Update address",
                        paragraph: "Could not update the shipping address."
                    });
                })
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
                         border: `1px solid ${isDark ? theme.palette.background.lighter : theme.palette.lightColor.main}`,
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
