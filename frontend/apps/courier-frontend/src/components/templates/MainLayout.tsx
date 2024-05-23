'use client';
import React, {PropsWithChildren, useState} from "react";
import NavigationBar from "@/components/organisms/navbar/NavigationBar";
import AuthProvider from "../../../api/auth/AuthContext";
import CartProvider from "../../../contexts/CartContext";
import FavoriteProvider from "../../../contexts/FavoriteContext";
import {Box, SxProps, Theme} from "@mui/material";
import themes from "@/theme/themes";
import useTheme from "@/theme/themes";

interface MainLayoutProps {
    children: React.ReactNode;
}
const MainLayout = ({
                        children,
                    }: MainLayoutProps) => {
    const theme = useTheme();

    const styles = {
        root: {
            display: "flex",
            flexDirection: "column",
            width: "auto",
            height: "100vh",
            // paddingTop: {xs: "56px", sm: "64px"},
        },
        layoutPaddings: {
            //margin: theme.spacing(0, 2),
            // [theme.breakpoints.down("md")]: {
            //   padding: theme.spacing(0, 0),
            // },
        },

        main: {
            flex: "1 1 100%",
            backgroundColor: themes().palette.background.default,
            // backgroundSize: "cover",
            padding: theme.spacing(5, 2, 2, 2),
        },

    };

    let mainStyles: SxProps<Theme> = [styles.layoutPaddings, styles.main];

    return (
        <main>
            <NavigationBar />
            <Box sx={styles.root} id="root">
                <Box component="main" sx={mainStyles}>
                    {children}
                </Box>
                {/*<Box sx={[styles.layoutPaddings]}>*/}
                {/*    <Footer />*/}
                {/*</Box>*/}
            </Box>
        </main>
    );
};

export default MainLayout;