import React, { useState } from "react";
import {
    Box,
    Button,
    Grid,
    IconButton,
    ListItemSecondaryAction,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Edit } from "@mui/icons-material";
import Delete from "@mui/icons-material/Delete";
import useTheme from "@/theme/themes";
import StyledButton from "@/components/atoms/StyledButton";
import {AddCircleOutlineIcon} from "@/components/atoms/icons";

type AddressManagementProps = {

};

const AddressManagement = ({  }: AddressManagementProps) => {
    const theme = useTheme();

    const handleAddAddress = () => {
        setSelectedShippingAddress(nullObject);
        toggleModal();
    };

    return (
        <Box sx={{padding: theme.spacing(2), mt:2, border: "1px solid #a5b4fc", borderRadius: "14px"}}>
            <Box>
                <Typography variant="h5" sx={{color: theme.palette.info.main, mb:2}}>Address Management</Typography>
                <StyledButton
                    variant="contained"
                    sx={{gap: 2}}
                    onClick={handleAddAddress}
                >
                    <AddCircleOutlineIcon/>
                    <Typography sx={{textTransform: "none"}}>Add address</Typography>
                </StyledButton>
            </Box>



        </Box>
    );
};

export default AddressManagement;
