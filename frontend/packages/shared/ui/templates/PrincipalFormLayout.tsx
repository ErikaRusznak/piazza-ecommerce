import {ReactElement} from "react";
import {Box, Container, Typography, useMediaQuery} from "@mui/material";
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
    const isSmallerScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                backgroundColor: 'rgba(234, 235, 255, 0.6)',
                borderRadius: theme.shape.borderRadius,
                px: 3, py:5, mt: 2,
                boxShadow: isDark ? '0px 4px 10px rgba(255, 255, 255, 0.4)' : '0px 4px 10px rgba(0, 0, 0, 0.4)'
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: alignItems,
                    justifyContent: "center",
                }}
            >
                <Typography component="h1" variant={isSmallerScreen ? "h6" : "h5"} sx={{color: textColor, mb: 3, alignContent: "center"}}>
                    {titleText}
                </Typography>
                {children}
            </Box>
        </Container>
    );
};

export default PrincipalFormLayout;