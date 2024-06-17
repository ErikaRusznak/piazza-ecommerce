import React, { useEffect, useState } from "react";
import { getBuyerByEmailApi } from "../../../../api/entities/BuyerApi";
import { AddressType } from "@/app/checkout/page";
import { Box, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type FullOrderInformationProps = {
    orderNumber: string;
    date: string;
    shippingAddress: AddressType;
    buyerEmail: string;
};

const FullOrderInformation = ({ orderNumber, date, shippingAddress, buyerEmail }: FullOrderInformationProps) => {
    const [buyer, setBuyer] = useState<any | null>(null);
    const theme = useTheme();

    const getBuyerDetails = (buyerEmail: string) => {
        getBuyerByEmailApi(buyerEmail)
            .then((res) => {
                setBuyer(res.data);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getBuyerDetails(buyerEmail);
    }, []);

    const textStyle = {
        fontSize: "16px",
        fontWeight: theme.typography.fontWeightRegular,
        marginBottom: theme.spacing(1),
    };

    return (
        buyer && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: theme.spacing(2) }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                    Order Information
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", color: theme.palette.text.primary }}>
                    <Typography sx={textStyle}>{`Order number: #${orderNumber}`}</Typography>
                    <Typography sx={textStyle}>{`Date: ${date}`}</Typography>
                </Box>
                <Divider />

                <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                    Shipping Address
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", color: theme.palette.text.primary }}>
                    <Typography sx={textStyle}>{`${shippingAddress.addressLine1}, ${shippingAddress.addressLine2}, ${shippingAddress.zipCode}`}</Typography>
                    <Typography sx={textStyle}>{`${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.country}`}</Typography>
                </Box>
                <Divider />

                <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                    Buyer Info
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", color: theme.palette.text.primary }}>
                    <Typography sx={textStyle}>{`${buyer.firstName} ${buyer.lastName}`}</Typography>
                    <Typography sx={textStyle}>{buyerEmail}</Typography>
                    <Typography sx={textStyle}>{buyer.telephone}</Typography>
                </Box>
            </Box>
        )
    );
};

export default FullOrderInformation;
