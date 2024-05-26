"use client";

import React, {useEffect, useState} from "react";
import {
    AppBar, Avatar,
    Button, Divider, List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    Toolbar,
    Typography
} from "@mui/material";
import {Box} from "@mui/system";
import {useTheme} from "@mui/material/styles";
import {
    CartStyledIcon,
    FavoriteStyledIcon,
    AccountCircleIcon, ShoppingCartCheckoutIcon, SettingsIcon, LogoutIcon, ChatIcon,
} from "@/components/atoms/icons";
import LogoComponent from "@/components/atoms/logo/LogoComponent";
import SimpleMenu from "@/components/moleculas/menu/SimpleMenu";
import {useAuth} from "components";
import HamburgerMenu from "@/components/organisms/navbar/HamburgerMenu";
import {useRouter} from "next/navigation";
import {getAllCategoriesApi} from "components";
import {baseURL} from "components";
import {useProfilePicture} from "../../../../contexts/ProfilePictureContext";
import {useThemeToggle} from "ui";
import {ThemedSwitch} from "ui";

const NavigationBar = () => {

    const theme = useTheme();
    const { isDark} = useThemeToggle();
    const router = useRouter();
    const backgroundColor = isDark ? theme.palette.background.default : "#DBE1FD";

    const [categories, setCategories] = useState([]);
    const auth = useAuth();

    const {isAuthenticated} = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const {profilePictureUrl} = useProfilePicture();

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
                boxShadow: theme.shadows[3]
                // borderBottom: "2px solid #020617"
            }}
        >
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>

                <LogoComponent/>

                <Box sx={{display: {xxs: "none", sm: "flex"}, gap: theme.spacing(3), alignItems: "center"}}>
                    <Typography
                        sx={{
                            color: theme.palette.info.main,
                            cursor: "pointer",
                            textTransform: "uppercase",
                            fontWeight: theme.typography.fontWeightRegular,
                        }}
                        onClick={() => router.push("/shop")}
                    >
                        Shop
                    </Typography>
                    <Typography
                        sx={{
                            color: theme.palette.info.main,
                            cursor: "pointer",
                            textTransform: "uppercase",
                            fontWeight: theme.typography.fontWeightRegular,
                        }}
                        onClick={() => router.push("/sellers")}
                    >
                        Sellers
                    </Typography>
                    <SimpleMenu
                        text="Categories"
                        menuItems={categories}
                    />
                </Box>

                <Box sx={{display: {xxs: "none", sm: "flex", gap: theme.spacing(3), alignItems: "center"}}}>
                    {isAuthenticated && (
                        <Box sx={{display: "flex", gap: theme.spacing(1), alignItems: "center"}}>
                            <FavoriteStyledIcon/>
                            <CartStyledIcon onClick={() => router.push("/shopping-cart")}/>
                        </Box>
                    )}

                    <Box>
                        {!isAuthenticated ? (
                            <>
                                <ThemedSwitch />
                                <Button variant="outlined"
                                        sx={{
                                            color: theme.palette.info.main,
                                            borderColor: theme.palette.lightColor.main,
                                            fontSize: "16px",
                                            "&:hover": {
                                                backgroundColor: theme.palette.lightColor.main,
                                                borderColor: theme.palette.primary.main
                                            }
                                        }}
                                        onClick={() => router.push("/login")}
                                >
                                    Login
                                </Button>
                            </>
                        ) : (
                            <>
                                {(profilePictureUrl) ? (
                                    <>
                                        <Avatar
                                            alt={profilePictureUrl}
                                            src={`${baseURL}${profilePictureUrl}`}
                                            aria-describedby={id}
                                            onClick={(event: any) => handleClick(event)}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                transition: "filter 0.3s ease-in-out",
                                                cursor: "pointer"
                                            }}
                                        />
                                    </>
                                ) : (
                                    <AccountCircleIcon
                                        sx={{color: textColor, cursor: "pointer", width: 30, height: 30,}}
                                        aria-describedby={id} onClick={(event: any) => handleClick(event)}/>
                                )}

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
                                    sx={{
                                        borderRadius: theme.shape.borderRadius,
                                        mt: 1
                                    }}
                                >
                                    <List
                                        sx={{
                                            boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.1)`,
                                            backgroundColor: theme.palette.lightColor.main,
                                            // backgroundColor: theme.palette.background.lighter,
                                        }}
                                    >
                                        <ListItemButton onClick={() => router.push("/chats")}>
                                            <ListItemIcon>
                                                <ChatIcon sx={{color: textColor}}/>
                                            </ListItemIcon>
                                            <ListItemText primary="Chats" sx={{color: textColor, fontSize: "1rem"}}/>
                                        </ListItemButton>
                                        <ListItemButton onClick={() => router.push("/orders")}>
                                            <ListItemIcon>
                                                <ShoppingCartCheckoutIcon sx={{color: textColor}}/>
                                            </ListItemIcon>
                                            <ListItemText primary="Orders" sx={{color: textColor, fontSize: "1rem"}}/>
                                        </ListItemButton>
                                        <ListItemButton onClick={() => router.push("/profile")}>
                                            <ListItemIcon>
                                                <SettingsIcon sx={{color: textColor}}/>
                                            </ListItemIcon>
                                            <ListItemText primary="Manage profile"
                                                          sx={{color: textColor, fontSize: "1rem"}}/>
                                        </ListItemButton>

                                        <Divider sx={{background: theme.palette.primary.main}}/>

                                        <Box sx={{display: "flex", justifyContent: "center", mt: 1}}>
                                            <ThemedSwitch />
                                        </Box>

                                        <ListItemButton onClick={() => auth.logout()}>
                                            <ListItemIcon>
                                                <LogoutIcon sx={{color: textColor}}/>
                                            </ListItemIcon>
                                            <ListItemText primary="Logout" sx={{color: textColor, fontSize: "1rem"}}/>
                                        </ListItemButton>
                                    </List>
                                </Popover>
                            </>
                        )}
                    </Box>
                </Box>

                <Box sx={{display: {xxs: "flex", sm: "none"}}}>
                    {(isAuthenticated && !mobileMenuOpen) && (
                        <Box sx={{display: "flex", gap: theme.spacing(1), alignItems: "center"}}>
                            <FavoriteStyledIcon/>
                            <CartStyledIcon onClick={() => router.push("/shopping-cart")}/>
                        </Box>
                    )}
                    {!isAuthenticated && (
                        <ThemedSwitch />
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
