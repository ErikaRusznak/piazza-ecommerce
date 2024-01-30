import React from "react";
import { CloseIcon, LoginIcon, MenuIcon } from "@/components/atoms/icons";
import { Box, Button, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import useTheme from "@/theme/themes";
import IconButton from "@mui/material/IconButton";

type HamburgerMenuProps = {
    isAuthenticated: boolean;
    mobileMenuOpen: boolean;
    onMenuIconClick: () => void;
};


const HamburgerMenu = ({ isAuthenticated, mobileMenuOpen, onMenuIconClick }: HamburgerMenuProps) => {
    const theme = useTheme();

    const buttonStyle = {
        m: 1,
        width: 0.5,
    }

    return (
        <>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={onMenuIconClick}
                sx={{ color: "white", pl: 6 }}
            >
                <MenuIcon />
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
                    <IconButton sx={{ mb: 1, color: theme.palette.info.main }}>
                        <CloseIcon onClick={onMenuIconClick} />
                    </IconButton>

                    <Divider sx={{ mb: 2, background: theme.palette.background.lighter }} />

                    <Box sx={{ mb: 2 }}>
                        <List>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LoginIcon sx={{ color: "primary.main" }} />
                                </ListItemIcon>
                                <ListItemText primary="Pictures" />
                            </ListItemButton>
                        </List>
                    </Box>
                    {!isAuthenticated && ( // ar trebui sa nu fie !
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
                            <Button variant="outlined"
                                    sx={{ ...buttonStyle,
                                        borderColor: theme.palette.background.lighter,
                                        color: theme.palette.info.main,
                                        "&:hover": {borderColor: theme.palette.background.darker}
                                    }}>
                                Register
                            </Button>
                            <Button variant="contained"
                                    sx={{ ...buttonStyle,
                                        background: theme.palette.background.lighter,
                                        color: theme.palette.info.main,
                                        "&:hover": {background: theme.palette.background.darker}
                                    }}>
                                Login
                            </Button>

                        </Box>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default HamburgerMenu;
