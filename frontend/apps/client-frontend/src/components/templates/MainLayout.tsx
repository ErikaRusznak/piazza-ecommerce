'use client';
import React from "react";
import NavigationBar from "@/components/organisms/navbar/NavigationBar";
import {Box, SxProps, Theme} from "@mui/material";
import Footer from "@/components/organisms/footer/Footer";
import {useTheme} from "@mui/material/styles";
import {useThemeToggle} from "ui";

interface MainLayoutProps {
    children: React.ReactNode;
}
const MainLayout = ({
                        children,
                    }: MainLayoutProps) => {
    const theme = useTheme();
    const {isDark} = useThemeToggle();

    const styles = {
        root: {
            display: "flex",
            flexDirection: "column",
            width: "auto",
            height: "100vh",
            // paddingTop: {xs: "56px", sm: "64px"},
        },
        main: {
            flex: "1 1 100%",
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(5, 2, 2, 2),
        },
        footer: {
            backgroundColor: isDark ? theme.palette.background.lighter : "#DBE1FD",
            padding: theme.spacing(2, 2, 2, 2),
        },
    };

    let mainStyles: SxProps<Theme> = [styles.footer, styles.main];

    return (
        <main>
            <NavigationBar />
            <Box sx={styles.root} id="root">
                <Box component="main" sx={mainStyles}>
                    {children}

                </Box>
                <Box sx={[styles.footer]}>
                    <Footer />
                </Box>
            </Box>
        </main>
    );
};

export default MainLayout;
