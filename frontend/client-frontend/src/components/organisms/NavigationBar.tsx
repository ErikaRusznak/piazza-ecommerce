"use client";

import React, {useEffect, useRef, useState} from "react";
import {AppBar, Button, SxProps, Theme, Toolbar, Typography} from "@mui/material";
import {Box} from "@mui/system";
import useTheme from "@/theme/themes";
import {
    ContentPasteIcon,
    MenuIcon,
    TuneIcon,
    CartIcon,
    FavoriteIcon,
    AccountCircleIcon,
} from "@/components/atoms/icons";
import LogoComponent from "@/components/logo/LogoComponent";
import SimpleMenu from "@/components/atoms/menu/SimpleMenu";
import {useAuth} from "../../../api/auth/AuthContext";
import {getAllCategoriesApi} from "../../../api/entities/CategoryApi";

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

type NavigationBarProps = {
    sx?: SxProps<Theme>;
}

const NavigationBar = ({sx} : NavigationBarProps) => {

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
    }, []);


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

                <Box sx={{display: {xs: "none", sm: "flex"}, gap: theme.spacing(4), alignItems: "center"}}>
                    <SimpleMenu
                        text="Categories"
                        menuItems={categories}
                    />
                    <Typography sx={{color: theme.palette.info.main}}>Shop</Typography>
                    <Typography sx={{color: theme.palette.info.main}}>Sellers</Typography>
                </Box>
                <Box sx={{display: {xs: "none", sm: "flex", gap: theme.spacing(3), alignItems: "center"}}}>
                    {!isAuthenticated && ( //should not be !
                        <Box sx={{display: "flex", gap: theme.spacing(2), alignItems: "center"}}>
                            <FavoriteIcon/>
                            <CartIcon/>
                        </Box>
                    )}

                    <Box>
                        {!isAuthenticated ? (
                            <Button variant="text"
                                    sx={{color: theme.palette.info.main,
                                        textTransform: "none",
                                        fontSize: "16px",
                                        "&:hover": {backgroundColor: theme.palette.background.lighter}
                                    }}
                                    >
                                Login
                            </Button>
                        ) : (
                            <>
                                <AccountCircleIcon/>
                                <>
                                    {/*<>Orders</>*/}
                                    {/*<>Settings</>*/}
                                </>
                            </>
                        )}


                    </Box>
                </Box>

                <Box sx={{display: {xs: "block", sm: "none"}}}>
                    {!isAuthenticated && ( //should not be !
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
