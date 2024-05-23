import React, {ReactElement} from "react";
import {Box, Container, Typography} from "@mui/material";
import useTheme from "@/theme/themes";

type PrincipalFormLayout = {
    children: ReactElement;
    titleText?: string;
    alignItems?: "center" | "left";
}
const PrincipalFormLayout = ({children, titleText="Complete form", alignItems="center"}: PrincipalFormLayout) => {
    const theme = useTheme();
    const textColor = theme.palette.info.contrastText;
    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                backgroundColor: 'rgba(234, 235, 255, 0.6)',
                borderRadius: theme.shape.borderRadius,
                px: 3, py:5, mt: 5,
                boxShadow: '0px 4px 10px rgba(255, 255, 255, 0.4)'
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: alignItems
                }}
            >
                <Typography component="h1" variant="h5" sx={{color: textColor, mb: 3}}>
                    {titleText}
                </Typography>
                {children}
            </Box>
        </Container>
    );
};

export default PrincipalFormLayout;