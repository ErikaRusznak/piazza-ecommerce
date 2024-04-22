import React, {useState} from "react";
import {Box, Typography} from "@mui/material";
import SimpleTextFieldDarkBackground from "@/components/atoms/form/dark/SimpleTextFieldDarkBackground";
import useTheme from "@/theme/themes";

type LegalDetailsFormProps = {
    name: string;
    cui: string;
    companyType: string;
    numericCodeByState: string;
    serialNumber: string;
    dateOfRegistration: Date;
};

const LegalDetailsForm = ({ name, cui, companyType, numericCodeByState, serialNumber, dateOfRegistration}:LegalDetailsFormProps) => {

    const theme = useTheme();
    const legalDetails = {
        name: name,
        cui: cui,
        companyType: companyType,
        numericCodeByState: numericCodeByState,
        serialNumber: serialNumber,
        dateOfRegistration: dateOfRegistration,
    };

    return (
        <Box sx={{ p: 2, border: '1px solid #a5b4fc', borderRadius: '14px' }}>
            <Typography variant="h5" sx={{ color: theme.palette.info.main, mb: 2}}>Legal Details</Typography>
            <SimpleTextFieldDarkBackground value={legalDetails.name} label={"Company name"} />
            <SimpleTextFieldDarkBackground value={legalDetails.companyType} label={"Company type"} />
            <SimpleTextFieldDarkBackground value={legalDetails.cui} label={"CUI"} />
            <SimpleTextFieldDarkBackground value={legalDetails.numericCodeByState} label={"Numeric Code By State"} />
            <SimpleTextFieldDarkBackground value={legalDetails.serialNumber} label={"Serial Number"} />
            <SimpleTextFieldDarkBackground value={legalDetails.dateOfRegistration} label={"Registration Date"} />
        </Box>

    );
};

export default LegalDetailsForm;