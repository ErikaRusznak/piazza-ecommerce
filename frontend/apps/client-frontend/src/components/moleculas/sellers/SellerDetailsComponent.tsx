import React from "react";
import { Typography, Divider, Box } from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useThemeToggle} from "../../../../contexts/ThemeContext";

type SellerDetailsComponentProps = {
    seller: any;
    username: string;
};
const SellerDetailsComponent = ({
                                    seller,
                                    username,
                                }: SellerDetailsComponentProps) => {
    const theme = useTheme();
    const {isDark} = useThemeToggle();
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box>
                <Typography variant="h6" gutterBottom sx={{color: isDark ? theme.palette.lightColor.main : theme.palette.primary.main, fontWeight: 600}}>
                    Contact details
                </Typography>
                <Typography sx={{color: theme.palette.info.main}}>
                    <span style={{ fontWeight: "bold"}}>
                        Address Line 1:
                    </span>{" "}
                    {seller.addressLine1}
                </Typography>
                <Typography sx={{color: theme.palette.info.main}}>
                    <span style={{ fontWeight: "bold" }}>Address Line 2:</span>{" "}
                    {seller.addressLine2}
                </Typography>
                <Typography sx={{color: theme.palette.info.main}}>
                    <span style={{ fontWeight: "bold" }}>City:</span> {seller.city}
                </Typography>
                <Typography sx={{color: theme.palette.info.main}}>
                    <span style={{ fontWeight: "bold" }}>State:</span> {seller.state}
                </Typography>
                <Typography sx={{color: theme.palette.info.main}}>
                    <span style={{ fontWeight: "bold" }}>Country:</span> {seller.country}
                </Typography>
                <Typography sx={{color: theme.palette.info.main}}>
                    <span style={{ fontWeight: "bold" }}>Zipcode:</span> {seller.zipCode}
                </Typography>
                <Divider style={{ margin: "16px 0", backgroundColor: theme.palette.primary.main }} />

                <Typography variant="h6" gutterBottom sx={{color: isDark ? theme.palette.lightColor.main : theme.palette.primary.main, fontWeight: 600}}>
                    Account details
                </Typography>
                {username === seller.account.email && (
                    <>
                        <Typography sx={{color: theme.palette.info.main}}>
                            <span style={{ fontWeight: "bold" }}>First name:</span>{" "}
                            {seller.account.firstName}
                        </Typography>
                        <Typography sx={{color: theme.palette.info.main}}>
                            <span style={{ fontWeight: "bold" }}>Last name:</span>{" "}
                            {seller.account.lastName}
                        </Typography>
                    </>
                )}
                <Typography sx={{color: theme.palette.info.main}}>
                    <span style={{ fontWeight: "bold" }}>Email:</span> {seller.account.email}
                </Typography>
                <Typography sx={{color: theme.palette.info.main}}>
                    <span style={{ fontWeight: "bold" }}>Telephone:</span>{" "}
                    {seller.account.telephone}
                </Typography>

                {(seller.sellerType === "COMPANY" || seller.sellerType === "PFA") && (
                    <>
                        <Divider style={{ margin: "16px 0", backgroundColor: theme.palette.primary.main }} />
                        <Typography variant="h6" gutterBottom sx={{color: theme.palette.lightColor.main, fontWeight: 600}}>
                            Legal details
                        </Typography>
                        <Typography sx={{color: theme.palette.info.main}}>
                            <span style={{ fontWeight: "bold" }}>Company Type:</span>{" "}
                            {seller.sellerType}
                        </Typography>
                        <Typography sx={{color: theme.palette.info.main}}>
                            <span style={{ fontWeight: "bold" }}>Company Name:</span>{" "}
                            {seller.companyName}
                        </Typography>
                        <Typography sx={{color: theme.palette.info.main}}>
                            <span style={{ fontWeight: "bold" }}>CUI:</span> {seller.cui}
                        </Typography>
                        <Typography sx={{color: theme.palette.info.main}}>
                            <span style={{ fontWeight: "bold" }}>Date of registration:</span>{" "}
                            {seller.dateOfRegistration}
                        </Typography>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default SellerDetailsComponent;