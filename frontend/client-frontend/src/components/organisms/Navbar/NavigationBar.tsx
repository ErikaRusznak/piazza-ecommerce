"use client";

import React, {useEffect, useState} from "react";
import {
    AppBar,
    Button, Divider, List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    SxProps,
    Theme,
    Toolbar,
    Typography
} from "@mui/material";
import {Box} from "@mui/system";
import useTheme from "@/theme/themes";
import {
    CartStyledIcon,
    FavoriteStyledIcon,
    AccountCircleIcon, ShoppingCartCheckoutIcon, SettingsIcon, LogoutIcon,
} from "@/components/atoms/icons";
import LogoComponent from "@/components/atoms/logo/LogoComponent";
import SimpleMenu from "@/components/moleculas/menu/SimpleMenu";
import {useAuth} from "../../../../api/auth/AuthContext";
import HamburgerMenu from "@/components/organisms/Navbar/HamburgerMenu";
import {useRouter} from "next/navigation";
import {getAllCategoriesApi} from "../../../../api/entities/CategoryApi";

type NavigationBarProps = {
    sx?: SxProps<Theme>;
}

const NavigationBar = ({sx}: NavigationBarProps) => {

    const theme = useTheme();
    const router = useRouter();
    const backgroundColor = theme.palette.background.default;

    const [categories, setCategories] = useState([]);
    const auth = useAuth();

    const {isAuthenticated, username, logout} = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const onMenuIconClick = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    }

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const textColor = theme.palette.info.main;

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
            position="sticky"
            sx={{
                top: 0,
                background: backgroundColor,
            }}
        >
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>

                <LogoComponent/>

                <Box sx={{display: {xs: "none", sm: "flex"}, gap: theme.spacing(3), alignItems: "center"}}>
                    <Typography
                        sx={{color: theme.palette.info.main, cursor: "pointer"}}
                        onClick={() => router.push("/shop")}
                    >
                        Shop
                    </Typography>
                    <Typography
                        sx={{color: theme.palette.info.main, cursor: "pointer"}}
                        onClick={() => router.push("/sellers")}
                    >
                        Sellers
                    </Typography>
                    <SimpleMenu
                        text="Categories"
                        menuItems={categories}
                    />
                </Box>

                <Box sx={{display: {xs: "none", sm: "flex", gap: theme.spacing(3), alignItems: "center"}}}>
                    {isAuthenticated && (
                        <Box sx={{display: "flex", gap: theme.spacing(1), alignItems: "center"}}>
                            <FavoriteStyledIcon/>
                            <CartStyledIcon/>
                        </Box>
                    )}

                    <Box>
                        {!isAuthenticated ? (
                            <Button variant="contained"
                                    sx={{
                                        color: theme.palette.info.main,
                                        backgroundColor: theme.palette.background.lighter,
                                        textTransform: "none",
                                        fontSize: "16px",
                                        "&:hover": {backgroundColor: theme.palette.secondary.main}
                                    }}
                                    onClick={() => router.push("/login")}
                            >
                                Login
                            </Button>
                        ) : (
                            <>
                                <AccountCircleIcon sx={{color: textColor, cursor: "pointer"}} aria-describedby={id} onClick={(event: any) => handleClick(event)}/>
                                <Popover
                                    id={id} open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    sx={{mt: 1,
                                        borderRadius: theme.shape.borderRadius,

                                    }}
                                >
                                    <List
                                        sx={{
                                            boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.1)`, // Add a subtle box shadow
                                            backgroundColor: "rgba(46,116,116, 0.7)",
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <ShoppingCartCheckoutIcon sx={{color: textColor}} />
                                            </ListItemIcon>
                                            <ListItemText primary="Orders" sx={{ color: textColor, fontSize: "1rem" }} />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <SettingsIcon sx={{color: textColor}}/>
                                            </ListItemIcon>
                                            <ListItemText primary="Settings" sx={{ color: textColor, fontSize: "1rem" }} />
                                        </ListItemButton>

                                        <Divider sx={{ background: theme.palette.background.lighter }} />

                                        <ListItemButton onClick={() => auth.logout()}>
                                            <ListItemIcon>
                                                <LogoutIcon sx={{color: textColor}} />
                                            </ListItemIcon>
                                            <ListItemText primary="Logout" sx={{ color: textColor, fontSize: "1rem" }} />
                                        </ListItemButton>
                                    </List>
                                </Popover>
                            </>
                        )}
                    </Box>
                </Box>

                <Box sx={{display: {xs: "flex", sm: "none"}}}>
                    {(isAuthenticated && !mobileMenuOpen) && (
                        <Box sx={{display: "flex", gap: theme.spacing(1), alignItems: "center"}}>
                            <FavoriteStyledIcon/>
                            <CartStyledIcon/>
                        </Box>
                    )}
                    <HamburgerMenu
                        isAuthenticated={isAuthenticated}
                        mobileMenuOpen={mobileMenuOpen}
                        onMenuIconClick={onMenuIconClick}
                        categoryList={categories}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};
export default NavigationBar;
