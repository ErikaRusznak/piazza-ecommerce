import React from "react";
import {Box, FormControlLabel, Radio, RadioGroup, Typography, useMediaQuery} from "@mui/material";
import AddressComponent from "@/components/atoms/AddressComponent";
import useTheme from "@/theme/themes";
import StyledButton from "@/components/atoms/StyledButton";
import {AddCircleOutlineIcon} from "@/components/atoms/icons";
import {ShippingAddressType} from "@/app/checkout/page";

type ShippingAddressesComponentProps = {
    shippingAddresses: ShippingAddressType[];
    selectedShippingAddress: ShippingAddressType;
    onAddressSelected: (event: any) => void;
    toggleModal: () => void;
    onAddAddress: () => void;
    onEdit: (address: ShippingAddressType) => void;
};

const ShippingAddressesComponent = ({
                                        shippingAddresses,
                                        selectedShippingAddress,
                                        onAddressSelected,
                                        toggleModal,
                                        onAddAddress,
                                        onEdit
                                    }: ShippingAddressesComponentProps) => {
    const theme = useTheme();
    const belowMedSize = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <>
            <Box sx={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                mb: belowMedSize ? 1 : 4.5

            }}>
                <Typography variant="h6" fontWeight="bold" sx={{
                    alignSelf: "end"
                }} color={theme.palette.info.main}>
                    Addresses
                </Typography>

                <StyledButton
                    variant="contained"
                    sx={{gap: 2}}
                    onClick={onAddAddress}
                >
                    <AddCircleOutlineIcon/>
                    <Typography sx={{textTransform: "none"}}>Add address</Typography>
                </StyledButton>
            </Box>
            <RadioGroup value={selectedShippingAddress.id} onChange={onAddressSelected}>
                {shippingAddresses.map((item) => (
                    <Box key={item.id}
                        sx={{
                            border: `1px solid ${selectedShippingAddress?.id === item.id ? "#a5b4fc" : theme.palette.background.lighter}`,
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

                        }}
                    >
                    <FormControlLabel
                        key={item.id}
                        value={item.id}
                        control={<Radio  sx={{ color: "#a5b4fc", '&.Mui-checked': { color: "#a5b4fc"}}}/>}
                        label={<AddressComponent item={item}
                                                 toggleModal={toggleModal}
                                                 onEdit={onEdit}
                        />}
                    />
                    </Box>
                ))}
            </RadioGroup>
        </>
    );
};

export default ShippingAddressesComponent;
