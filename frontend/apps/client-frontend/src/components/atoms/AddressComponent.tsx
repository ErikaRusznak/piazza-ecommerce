import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import {ShippingAddressType} from "@/app/checkout/page";
import {useTheme} from "@mui/material/styles";

type AddressComponentProps = {
    item: ShippingAddressType;
    toggleModal: () => void;
    onEdit: (address: ShippingAddressType) => void;
};

const AddressComponent = ({ item, toggleModal, onEdit }: AddressComponentProps) => {
    const theme = useTheme();
    return (
        <Box sx={{ }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: theme.palette.info.main }}>
                <Box sx={{ flex: "1", ml:1}}>
                    <Typography>{item.address.city}</Typography>
                    <Typography>{item.address.addressLine1}</Typography>
                    <Typography>{item.address.addressLine2}</Typography>
                    <Typography>{`${item.firstName} ${item.lastName} ${item.telephone}`}</Typography>
                </Box>
            </Box>

            <IconButton onClick={() => onEdit(item)} sx={{
                position:"absolute",
                top:"0", right: 0, p:2
            }}>
                <EditIcon sx={{color: theme.palette.info.main, "&:hover": {color: theme.palette.primary.main}}} />
            </IconButton>
        </Box>

    );
};

export default AddressComponent;
