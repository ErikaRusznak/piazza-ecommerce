import React from "react";
import {FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {useTheme} from "@mui/material/styles";

type PaymentTypeRadioProps = {
    paymentType: string;
    handlePaymentTypeChange:(event: {target: {value: React.SetStateAction<string>;}; }) => void;
};
const PaymentTypeRadio = ({paymentType, handlePaymentTypeChange}:PaymentTypeRadioProps) => {

    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" color={theme.palette.info.main}>
                Payment Method
            </Typography>
            <RadioGroup
                row
                value={paymentType}
                onChange={handlePaymentTypeChange}
                sx={{ marginLeft: theme.spacing(2), color: theme.palette.info.main }}
            >
                <FormControlLabel
                    value="CASH"
                    control={
                        <Radio sx={{color: "#a5b4fc", '&.Mui-checked': { color: "#a5b4fc" } }}/>
                    }
                    label="Cash"
                />
                <FormControlLabel
                    value="CARD"
                    control={
                        <Radio sx={{color: "#a5b4fc", '&.Mui-checked': { color: "#a5b4fc" } }}/>
                    }
                    label="Card"
                />
            </RadioGroup>
        </Box>
    );
};
export default PaymentTypeRadio;