'use client'
import React, {PropsWithChildren} from "react";
import NavigationBar from "@/components/organisms/Navbar/NavigationBar";
import AuthProvider from "../../../api/auth/AuthContext";
import CartProvider from "../../../contexts/CartContext";
import FavoriteProvider from "../../../contexts/FavoriteContext";
import {Box, SxProps, Theme} from "@mui/material";
import themes from "@/theme/themes";

const MainLayout = ({children}: PropsWithChildren) => {

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
            backgroundColor: themes().palette.background.darker,
            // backgroundSize: "cover",
            padding: themes().spacing(5, 2, 2, 2),
         },
    };

    const mainStyles: SxProps<Theme> = [
        {
            ...styles.main,
        },
    ];
    return (
        <>
            <Box sx={styles.root} id="root">
                <Box component="main" sx={mainStyles}>
                    {children}
                </Box>
                {/*<Box sx={[styles.layoutPaddings]}>*/}
                {/*    <Footer weAreHiringButtonColor={weAreHiringButtonColor}></Footer>*/}
                {/*</Box>*/}
            </Box>
        </>
    );
};

export default MainLayout;
