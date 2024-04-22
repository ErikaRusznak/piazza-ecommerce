import React, {useEffect, useState} from "react";
import {
    Box,
    Typography,
} from "@mui/material";
import useTheme from "@/theme/themes";
type AddressManagementProps = {

};

const AddressManagement = ({  }: AddressManagementProps) => {
    const theme = useTheme();


    return (
        <Box sx={{padding: theme.spacing(2), mt:2, border: "1px solid #a5b4fc", borderRadius: "14px"}}>
            <Typography>Address</Typography>
        </Box>
    );
};

export default AddressManagement;
