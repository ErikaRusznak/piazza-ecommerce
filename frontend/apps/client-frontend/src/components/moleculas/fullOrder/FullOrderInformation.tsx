import React, {useEffect, useState} from "react";
import {getBuyerByEmailApi} from "../../../../api/entities/BuyerApi";
import {AddressType, ShippingAddressType} from "@/app/checkout/page";
import {Box, Divider, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import useTheme from "@/theme/themes";

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
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        getBuyerDetails(buyerEmail);
    }, []);

    return (
        buyer && (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.4, color: theme.palette.lightColor.main }}>
                    Order Information
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", color: theme.palette.info.main, mb:1 }}>
                    <Typography variant="subtitle1" sx={{ }}>{`Order number: #${orderNumber}`}</Typography>
                    <Typography variant="subtitle1">{`Date: ${date}`}</Typography>
                </Box>
                <Divider sx={{ backgroundColor: theme.palette.primary.main }} />

                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.4, color: theme.palette.lightColor.main }}>
                    Shipping Address
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", color: theme.palette.info.main, mb:1 }}>
                    <Typography variant="subtitle1" sx={{}}>{`${shippingAddress.addressLine1}, ${shippingAddress.addressLine2}, ${shippingAddress.zipCode}`}</Typography>
                    <Typography variant="subtitle1">{`${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.country}`}</Typography>
                </Box>
                <Divider sx={{ backgroundColor: theme.palette.primary.main }} />

                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 0.4, color: theme.palette.lightColor.main }}>
                    Buyer Info
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", color: theme.palette.info.main }}>
                    <Typography variant="subtitle1" sx={{}}>{`${buyer.firstName} ${buyer.lastName}`}</Typography>
                    <Typography variant="subtitle1" sx={{}}>{buyerEmail}</Typography>
                    <Typography variant="subtitle1">{buyer.telephone}</Typography>
                </Box>
            </Box>
        )
    );
};

export default FullOrderInformation;