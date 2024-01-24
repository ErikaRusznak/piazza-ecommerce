"use client";

import React, {useEffect, useRef, useState} from "react";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {Box} from "@mui/system";
import useTheme from "@/theme/themes";
import {ContentPasteIcon, MenuIcon, TuneIcon} from "@/components/atoms/icons";
import {getAllCategoriesApi} from "../../../../api/entities/CategoryApi";
import {router} from "next/client";
import LogoComponent from "@/components/logo/LogoComponent";
import {useAuth} from "../../../../api/auth/AuthContext";

const accountDataClient = [
    {name: 'Orders', href: '/order-history', icon: ContentPasteIcon},
    {name: 'Settings', href: '/account/settings', icon: TuneIcon},
];

const accountDataAdmin = [
    {name: 'Orders', href: '/alias/order-history', icon: ContentPasteIcon},
    {name: 'Settings', href: '/account/settings', icon: TuneIcon},
];

const callsToAction = [
    {name: 'See all', href: '/products/categories'},
];

const NavigationBar = () => {

    const theme = useTheme();
    const backgroundColor = theme.palette.background.default;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    const {isAuthenticated, username, logout} = useAuth();
    const buttonRef = useRef();

    const getCategoryList = () => {
        getAllCategoriesApi()
            .then((res: { data: { data: React.SetStateAction<never[]>; }; }) => {
                setCategories(res.data.data);
            })
            .catch((err: any) => console.log(err));
    };

    useEffect(() => {
        getCategoryList();
    }, [location, username]);

    const createQueryParam = (categoryName: string) => {
        const queryParams = new URLSearchParams()
        queryParams.set("categoryName", categoryName);
        const newSearch = queryParams.toString();
        router.push(`/products?${newSearch}`);
    }

    return (
        <AppBar
            color="default"
            elevation={0}
            sx={{
                background: backgroundColor,
            }}
        >
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <LogoComponent/>

                <Box sx={{display: {xs: "none", sm: "flex"}, gap: theme.spacing(1)}}>
                    <Typography>Categories</Typography>
                    <Typography>Shop</Typography>
                    <Typography>Sellers</Typography>
                </Box>
                <Box sx={{display: {xs: "none", sm: "flex", gap:theme.spacing(3)}}}>
                    <Box sx={{display: "flex", gap:theme.spacing(1)}}>
                        <Typography>Fav</Typography>
                        <Typography>Cart</Typography>
                    </Box>
                    <Box >
                        {/*    if its authenticated else login*/}
                        <>Logout</>
                        <>
                            {/*<>Orders</>*/}
                            {/*<>Settings</>*/}
                        </>

                    </Box>
                </Box>


                <Box sx={{display: {xs: "block", sm: "none"}}}>
                    {!isAuthenticated && (
                        <>
                            <>Favvv</>
                            <>Cart</>
                        </>
                    )}
                    <Button
                        sx={{justifyContent: "flex-end"}}
                        onClick={() => setMobileMenuOpen(true)}>
                        <MenuIcon/>
                    </Button>
                    <Box>
                        {/*Transitions*/}

                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
        ;
};
export default NavigationBar;
