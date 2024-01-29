'use client'
import React, {PropsWithChildren} from "react";
import NavigationBar from "@/components/organisms/NavigationBar";
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
            paddingTop: {xs: "56px", sm: "64px"},

        },
        layoutPaddings: {
            //margin: theme.spacing(0, 2),
            // [theme.breakpoints.down("md")]: {
            //   padding: theme.spacing(0, 0),
            // },
        },

        main: {
            flex: "1 1 100%",
            backgroundColor: themes().palette.background.darker,
            // backgroundSize: "cover",
            padding: themes().spacing(2, 2, 2, 2),
        },
    };

    const mainStyles: SxProps<Theme> = [
        styles.layoutPaddings,
        {
            ...styles.main,
            // width: "100% !important", // Set width to 100% with !important
            // paddingLeft: themes().spacing(2), // Set left padding to 2 units
            // paddingRight: themes().spacing(2), // Set right padding to 2 units
        },
    ];
    return (
        <AuthProvider>
            <CartProvider>
                <FavoriteProvider>
                    <NavigationBar sx={{...styles.layoutPaddings}}/>
                    <Box sx={styles.root} id="root">
                        <Box component="main" sx={mainStyles}>
                            {children}
                        </Box>
                        {/*<Box sx={[styles.layoutPaddings]}>*/}
                        {/*    <Footer weAreHiringButtonColor={weAreHiringButtonColor}></Footer>*/}
                        {/*</Box>*/}
                    </Box>

                </FavoriteProvider>
            </CartProvider>
        </AuthProvider>
    );
};

export default MainLayout;
