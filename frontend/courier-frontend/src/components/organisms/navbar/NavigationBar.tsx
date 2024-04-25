"use client";

import React, {useEffect, useState} from "react";
import {
    AppBar,
    Button,
    SxProps,
    Theme,
    Toolbar,
    Typography
} from "@mui/material";
import {Box} from "@mui/system";
import useTheme from "@/theme/themes";
import {
    AccountCircleIcon
} from "@/components/atoms/icons";
import LogoComponent from "@/components/atoms/logo/LogoComponent";
import {useAuth} from "../../../../api/auth/AuthContext";
import HamburgerMenu from "@/components/organisms/navbar/HamburgerMenu";
import {useRouter} from "next/navigation";

type NavigationBarProps = {
    sx?: SxProps<Theme>;
}

const NavigationBar = ({sx}: NavigationBarProps) => {

    const theme = useTheme();
    const router = useRouter();
    const backgroundColor = theme.palette.background.default;

    const {isAuthenticated, username, logout} = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);;

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

                <Box sx={{display: {xs: "none", sm: "flex"}, gap: theme.spacing(3), alignItems: "center"}}>
                    <Typography
                        sx={{color: theme.palette.info.main,
                            cursor: "pointer",
                            textTransform: "uppercase"
                    }}
                        onClick={() => router.push("/chats")}
                    >
                        Chats
                    </Typography>
                    <Typography
                        sx={{color: theme.palette.info.main,
                            cursor: "pointer",
                            textTransform: "uppercase"
                        }}
                        onClick={() => router.push("/profile")}
                    >
                        Profile
                    </Typography>
                </Box>

                <Box sx={{display: {xs: "none", sm: "flex", gap: theme.spacing(3), alignItems: "center"}}}>
                    <Box>
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
                             <AccountCircleIcon sx={{color: textColor, cursor: "pointer", width: 30, height: 30,}} aria-describedby={id} onClick={(event: any) => handleClick(event)}/>
                        )}
                    </Box>
                </Box>

                <Box sx={{display: {xs: "flex", sm: "none"}}}>
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
