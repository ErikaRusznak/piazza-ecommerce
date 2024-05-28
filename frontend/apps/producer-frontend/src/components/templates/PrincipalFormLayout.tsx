import React, {ReactElement} from "react";
import {Box, Container, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useThemeToggle} from "ui";

type PrincipalFormLayout = {
    children: ReactElement;
    titleText?: string;
    alignItems?: "center" | "left";
}
const PrincipalFormLayout = ({children, titleText="Complete form", alignItems="center"}: PrincipalFormLayout) => {
    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const textColor = isDark ? theme.palette.info.contrastText : theme.palette.info.main;

    return (
        <Container
            component="main"
            maxWidth="lg"
            sx={{
                backgroundColor: 'rgba(234, 235, 255, 0.6)',
                borderRadius: theme.shape.borderRadius,
                px: 3, py:5, mt: 2,
                boxShadow: '0px 4px 10px rgba(255, 255, 255, 0.4)'
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: alignItems,
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