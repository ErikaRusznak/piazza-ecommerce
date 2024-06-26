import React from "react";
import {CloseIcon, MenuIcon} from "@/components/atoms/icons";
import {Box, Button, Drawer, List, ListItemButton, ListItemText, Divider, Collapse} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import {useRouter} from "next/navigation";
import {useAuth} from "components";

type HamburgerMenuProps = {
    isAuthenticated: boolean;
    mobileMenuOpen: boolean;
    onMenuIconClick: () => void;
};

const HamburgerMenu = ({isAuthenticated, mobileMenuOpen, onMenuIconClick}: HamburgerMenuProps) => {

    const theme = useTheme();
    const router = useRouter();
    const auth = useAuth();

    const buttonStyle = {
        m: 1,
        width: 0.5,
    };
    const textColor = theme.palette.info.main;

    return (
        <>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={onMenuIconClick}
                sx={{color: theme.palette.info.main, }}
            >
                <MenuIcon/>
            </IconButton>

            <Drawer
                anchor="right"
                open={mobileMenuOpen}
                onClose={onMenuIconClick}
            >
                <Box
                    sx={{
                        p: 1,
                        width: "15rem",
                        height: 1,
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    <IconButton sx={{mb: 1, color: textColor}} onClick={onMenuIconClick}>
                        <CloseIcon/>
                    </IconButton>

                    <Divider sx={{mb: 2, background: theme.palette.background.lighter}}/>

                    <Box sx={{mb: 2}}>
                        <List>
                            {isAuthenticated && (
                                <>
                                    <ListItemButton onClick={() => router.push("/orders")}>
                                        <ListItemText primary="Orders" sx={{color: textColor}} />
                                    </ListItemButton>
                                    <ListItemButton onClick={() => router.push("/chats")}>
                                        <ListItemText primary="Chats" sx={{color: textColor}} />
                                    </ListItemButton>
                                    <ListItemButton onClick={() => router.push("/profile")}>
                                        <ListItemText primary="Manage profile" sx={{color: textColor}}/>
                                    </ListItemButton>
                                </>
                            )}
                        </List>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            position: "absolute",
                            bottom: "0",
                            left: "50%",
                            transform: "translate(-50%, 0)",
                            mb: 5,
                        }}
                    >
                        {!isAuthenticated ? (
                            <>
                                <Button variant="outlined"
                                        sx={{
                                            ...buttonStyle,
                                            borderColor: theme.palette.background.lighter,
                                            color: theme.palette.info.main,
                                            "&:hover": {
                                                borderColor: theme.palette.secondary.main,
                                                color: theme.palette.secondary.main,
                                            }
                                        }}
                                        onClick={() => {
                                            router.push("/register");
                                            onMenuIconClick();
                                        }}
                                >
                                    Register
                                </Button>
                                <Button variant="contained"
                                        sx={{
                                            ...buttonStyle,
                                            background: theme.palette.primary.main,
                                            color: "white",
                                            "&:hover": {background: theme.palette.secondary.main}
                                        }}
                                        onClick={() => {
                                            router.push("/login");
                                            onMenuIconClick();
                                        }}
                                >
                                    Login
                                </Button>
                            </>
                        ) : (
                            <Button variant="contained"
                                    sx={{
                                        ...buttonStyle,
                                        background: theme.palette.primary.main,
                                        color: "white",
                                        width: "100%",
                                        "&:hover": {background: theme.palette.secondary.main}
                                    }}
                                    onClick={() => {
                                        onMenuIconClick();
                                        auth.logout();
                                    }}
                            >
                                Logout
                            </Button>
                        )}
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default HamburgerMenu;
