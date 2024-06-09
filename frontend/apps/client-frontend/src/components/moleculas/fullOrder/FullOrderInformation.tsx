import React, {useEffect, useState} from "react";
import {getBuyerByEmailApi} from "../../../../api/entities/BuyerApi";
import {AddressType} from "@/app/checkout/page";
import {Box, Divider, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";

type FullOrderInformationProps = {
    orderNumber: number;
    date: any;
    shippingAddress: AddressType;
    buyerEmail: string;
};

const FullOrderInformation = ({orderNumber, date, shippingAddress, buyerEmail}:FullOrderInformationProps) => {

    const [buyer, setBuyer] = useState<any|null>(null);
    // TODO - buyer type
    const theme = useTheme();

    const getBuyerDetails = (buyerEmail: string) => {
        getBuyerByEmailApi(buyerEmail)
            .then((res) => {
                setBuyer(res.data);
            })
            .catch((err) => console.error(err))
    }
    useEffect(() => {
        getBuyerDetails(buyerEmail);
    }, []);

    const textStyle = {
        fontSize: "18px", fontWeight: theme.typography.fontWeightRegular
    }
    return (
        buyer && (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.4, color: theme.palette.lightColor.main }}>
                    Order Information
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", color: theme.palette.info.main, mb:1 }}>
                    <Typography sx={textStyle}>{`Order number: #${orderNumber}`}</Typography>
                    <Typography sx={textStyle}>{`Date: ${date}`}</Typography>
                </Box>
                <Divider sx={{ backgroundColor: theme.palette.primary.main }} />

                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.4, color: theme.palette.lightColor.main }}>
                    Shipping Address
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", color: theme.palette.info.main, mb:1 }}>
                    <Typography sx={textStyle}>{`${shippingAddress.addressLine1}, ${shippingAddress.addressLine2}, ${shippingAddress.zipCode}`}</Typography>
                    <Typography sx={textStyle}>{`${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.country}`}</Typography>
                </Box>
                <Divider sx={{ backgroundColor: theme.palette.primary.main }} />

                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 0.4, color: theme.palette.lightColor.main }}>
                    Buyer Info
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", color: theme.palette.info.main }}>
                    <Typography sx={textStyle}>{`${buyer.firstName} ${buyer.lastName}`}</Typography>
                    <Typography sx={textStyle}>{buyerEmail}</Typography>
                    <Typography sx={textStyle}>{buyer.telephone}</Typography>
                </Box>
            </Box>
        )
    );
};

export default FullOrderInformation;