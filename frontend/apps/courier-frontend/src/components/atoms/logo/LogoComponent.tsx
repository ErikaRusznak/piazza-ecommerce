import React from "react";
import {Box, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const LogoComponent = () => {

    const theme = useTheme();
    return (
        <Box>
            <Typography color={theme.palette.primary.main} sx={{fontWeight: theme.typography.fontWeightMedium}}>
                Courier Portal
            </Typography>
        </Box>
    )
}

export default LogoComponent;