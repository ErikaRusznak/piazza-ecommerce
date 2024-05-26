"use client";

import React, {useState} from "react";
import {
    AppBar,
    Button, List, ListItemButton, ListItemIcon, ListItemText, Popover,
    SxProps,
    Theme,
    Toolbar,
    Typography
} from "@mui/material";
import {Box} from "@mui/system";
import {useTheme} from "@mui/material/styles";
import {
    AccountCircleIcon
} from "@/components/atoms/icons";
import LogoComponent from "@/components/atoms/logo/LogoComponent";
import {useAuth} from "components";
import HamburgerMenu from "@/components/organisms/navbar/HamburgerMenu";
import {useRouter} from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import {useThemeToggle} from "../../../../contexts/ThemeContext";
import ThemedSwitch from "@/components/atoms/icons/ThemedSwitch";

type NavigationBarProps = {
    sx?: SxProps<Theme>;
}

const NavigationBar = ({sx}: NavigationBarProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const router = useRouter();
    const backgroundColor = isDark ? theme.palette.background.default : "#DBE1FD";
    const auth = useAuth();

    const {isAuthenticated} = useAuth();
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
                        onClick={() => router.push("/orders")}
                    >
                        Orders
                    </Typography>
                    <Typography
                        sx={{
                            color: theme.palette.info.main,
                            cursor: "pointer",
                            textTransform: "uppercase",
                            fontWeight: theme.typography.fontWeightRegular,
                        }}
                        onClick={() => router.push("/chats")}
                    >
                        Chats
                    </Typography>
                    <Typography
                        sx={{
                            color: theme.palette.info.main,
                            cursor: "pointer",
                            textTransform: "uppercase",
                            fontWeight: theme.typography.fontWeightRegular,
                        }}
                        onClick={() => router.push("/profile")}
                    >
                        Profile
                    </Typography>
                </Box>

                <Box sx={{display: {xxs: "none", sm: "flex", gap: theme.spacing(3), alignItems: "center"}}}>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <ThemedSwitch/>
                        {!isAuthenticated ? (
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
                        ) : (
                            <AccountCircleIcon sx={{color: textColor, cursor: "pointer", width: 30, height: 30,}}
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
                                    backgroundColor: theme.palette.background.default,
                                    color: theme.palette.info.contrastText,
                                    // backgroundColor: theme.palette.background.lighter,
                                }}
                            >
                                <ListItemButton onClick={() => auth.logout()}>
                                    <ListItemIcon>
                                        <LogoutIcon sx={{color: textColor}}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" sx={{color: textColor, fontSize: "1rem"}}/>
                                </ListItemButton>
                            </List>
                        </Popover>
                    </Box>
                </Box>

                <Box sx={{display: {xxs: "flex", sm: "none"}, alignItems: "center"}}>
                    <ThemedSwitch />
                    <HamburgerMenu
                        isAuthenticated={isAuthenticated}
                        mobileMenuOpen={mobileMenuOpen}
                        onMenuIconClick={onMenuIconClick}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};
export default NavigationBar;
