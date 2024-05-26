import React, {useState} from "react";
import {CloseIcon, ExpandLess, ExpandMore, MenuIcon} from "@/components/atoms/icons";
import {Box, Button, Drawer, List, ListItemButton, ListItemText, Divider, Collapse} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import {useRouter} from "next/navigation";
import { useAuth, baseURL } from "components";
import {useThemeToggle} from "../../../../contexts/ThemeContext";
import ThemedSwitch from "@/components/atoms/icons/ThemedSwitch";

type CategoryType = {
    id: number;
    imageName: string;
    name: string;
}

type HamburgerMenuProps = {
    isAuthenticated: boolean;
    mobileMenuOpen: boolean;
    onMenuIconClick: () => void;
    categoryList: CategoryType[] | null | undefined;
};

const HamburgerMenu = ({isAuthenticated, mobileMenuOpen, onMenuIconClick, categoryList}: HamburgerMenuProps) => {

    const theme = useTheme();
    const router = useRouter();
    const auth = useAuth();
    const [openCategories, setOpenCategories] = useState(false);
    const handleOpenCategories = () => {
        setOpenCategories(!openCategories);
    };

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
                sx={{color: theme.palette.info.main, pl: 3}}
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

                    <Divider sx={{backgroundColor: theme.palette.info.contrastText}}/>

                    <Box sx={{mb: 2}}>
                        <List>
                            <ListItemButton onClick={handleOpenCategories}>
                                <ListItemText sx={{color: textColor}} primary="Categories"/>
                                {openCategories ? <ExpandLess sx={{color: textColor}}/> :
                                    <ExpandMore sx={{color: textColor}}/>}
                            </ListItemButton>
                            <Collapse in={openCategories} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {categoryList?.map((item) => (
                                        <ListItemButton key={item.id} sx={{pl: 4}}>
                                            <img
                                                src={`${baseURL}${item.imageName}`}
                                                alt={item.name}
                                                width={30}
                                                height={30}
                                                style={{filter: 'brightness(0) saturate(100%) invert(100%) sepia(100%) hue-rotate(100deg)'}}
                                            />
                                            <ListItemText sx={{pl: 2, color: textColor}} primary={item.name}/>
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                            <ListItemButton onClick={() => router.push("/shop")}>
                                <ListItemText primary="Shop" sx={{color: textColor}} />
                            </ListItemButton>
                            <ListItemButton onClick={() => router.push("/sellers")}>
                                <ListItemText primary="Sellers" sx={{color: textColor}} />
                            </ListItemButton>

                            <Divider sx={{backgroundColor: theme.palette.info.contrastText}}/>

                            {isAuthenticated && (
                                <>
                                    <ListItemButton onClick={() => router.push("/chats")}>
                                        <ListItemText primary="Chats" sx={{color: textColor}} />
                                    </ListItemButton>
                                    <ListItemButton onClick={() => router.push("/orders")}>
                                        <ListItemText primary="Orders" sx={{color: textColor}} />
                                    </ListItemButton>
                                    <ListItemButton onClick={() => router.push("/profile")}>
                                        <ListItemText primary="Manage profile" sx={{color: textColor}}/>
                                    </ListItemButton>
                                    <Box sx={{display: "flex", justifyContent: "center", mt: 1}}>
                                        <ThemedSwitch/>
                                    </Box>
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
                                            "&:hover": {borderColor: theme.palette.secondary.main}
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
                                            color: theme.palette.info.main,
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
                                        color: theme.palette.info.main,
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
