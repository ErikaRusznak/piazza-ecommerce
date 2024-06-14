"use client";

import * as React from 'react';
import {styled, Theme, CSSObject} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useTheme} from "@mui/material/styles";
import {ThemedSwitch} from "ui";
import {Button} from "@mui/material";
import {usePathname, useRouter} from "next/navigation";
import {useThemeToggle} from "ui";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.enteringScreen + 100,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.leavingScreen + 100,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(() => {
    const theme = useTheme();

    return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        backgroundColor: theme.palette.background.default,

    };
});

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.leavingScreen + 100,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.enteringScreen + 100,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({open}) => {
        const theme = useTheme();
        const openedStyles = openedMixin(theme);
        const closedStyles = closedMixin(theme);
        const { isDark } = useThemeToggle();
        return {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            '& .MuiDrawer-paper.MuiDrawer-paperAnchorLeft': {
                backgroundColor: theme.palette.background.default,
                borderRightColor: isDark ? theme.palette.info.contrastText : "#ddd",
            },
            ...(open && {
                ...openedStyles,
                '& .MuiDrawer-paper': openedStyles,
            }),
            ...(!open && {
                ...closedStyles,
                '& .MuiDrawer-paper': closedStyles,
            }),
        };
    },
);

type NavigationProps = {
    children: React.ReactNode;
    isSeller: boolean;
    isAuthenticated: boolean;
    logout: () => void;
    nameOfPortal: string;
    informationList: {label: string, icon:React.JSX.Element, href: string}[];
    profileList: {label: string, icon:React.JSX.Element, href: string}[];
};

export default function NavigationAdmProd({children, isSeller, isAuthenticated, logout, nameOfPortal, informationList, profileList}: NavigationProps) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const router = useRouter();
    const pathname = usePathname();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex', backgroundColor: theme.palette.background.default, height: '150vh'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{
                    backgroundColor: theme.palette.background.default,
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                color: theme.palette.primary.main,
                                marginRight: 5,
                                ...(open && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" color={theme.palette.primary.main}>
                            {nameOfPortal}
                        </Typography>
                    </Box>
                    <ThemedSwitch />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Box sx={{}}>
                    <DrawerHeader sx={{}}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon sx={{color: theme.palette.primary.main}}/> :
                                <ChevronLeftIcon sx={{color: theme.palette.primary.main}}/>}
                        </IconButton>
                    </DrawerHeader>
                </Box>
                <Divider sx={{backgroundColor: theme.palette.info.contrastText}}/>
                <List>
                    {informationList.map((listItem) => (
                        <ListItem key={listItem.label} disablePadding sx={{display: 'block'}}
                                  className={pathname === listItem.href ? "ActiveLink" : ""}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                selected={pathname?.startsWith(listItem.href)}
                                onClick={() => {
                                    handleDrawerClose();
                                    setTimeout(() => {
                                        router.push(listItem.href);
                                    }, 200);
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {listItem.icon}
                                </ListItemIcon>
                                <ListItemText primary={listItem.label}
                                              sx={{opacity: open ? 1 : 0, color: theme.palette.info.main}}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{backgroundColor: theme.palette.info.contrastText}}/>
                <List>
                    {profileList.map((listItem) => (
                        <ListItem key={listItem.label}
                                  disablePadding sx={{display: 'block'}}
                                  className={pathname === listItem.href ? "ActiveLink" : ""}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                selected={pathname?.startsWith(listItem.href)}
                                onClick={() => {
                                    handleDrawerClose();
                                    setTimeout(() => {
                                        router.push(listItem.href);
                                    }, 200);
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {listItem.icon}
                                </ListItemIcon>
                                <ListItemText primary={listItem.label}
                                              sx={{opacity: open ? 1 : 0, color: theme.palette.info.main}}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Box sx={{position: 'absolute', bottom: 0, left: 0, right: 0, p: 2, textAlign: 'center'}}>
                    {open ? (
                        <Box sx={{display: "flex", justifyContent: isAuthenticated ? "center" : "space-between"}}>
                            {isAuthenticated ? (
                                <>
                                    <Button variant="contained" sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        justifyContent: "center",
                                        "&:hover": {
                                            backgroundColor: theme.palette.tertiary.main,
                                        }
                                    }} onClick={() => logout()}>
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    {isSeller && (
                                        <Button variant="outlined"
                                                sx={{
                                                    color: theme.palette.primary.main,
                                                    borderColor: theme.palette.primary.main,
                                                    "&:hover": {
                                                        color: theme.palette.tertiary.main,
                                                        borderColor: theme.palette.tertiary.main,
                                                    }
                                                }}
                                                onClick={() => router.push("/register")}>
                                            Register
                                        </Button>
                                    )}
                                    <Button variant="contained"
                                            sx={{
                                                backgroundColor: theme.palette.primary.main,
                                                "&:hover": {
                                                    backgroundColor: theme.palette.tertiary.main,
                                                }
                                            }}
                                            onClick={() => router.push("/login")}>
                                        Login
                                    </Button>
                                </>
                            )}
                        </Box>
                    ) : (
                        isAuthenticated ? (
                            <ListItemButton
                                sx={{
                                    minHeight: 48, justifyContent: open ? 'initial' : 'center',}}
                                onClick={() => {
                                    logout();
                                    router.push("/")
                                }}
                            >
                                <ListItemIcon
                                    sx={{minWidth: 0, mr: 1, justifyContent: 'center',}}
                                >
                                    <LogoutIcon sx={{color: theme.palette.info.main}}/>
                                </ListItemIcon>
                                <ListItemText primary={"Logout"} sx={{opacity: open ? 1 : 0}}/>
                            </ListItemButton>
                        ) : (
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                }}
                                onClick={() => router.push("/login")}
                            >
                                <ListItemIcon
                                    sx={{minWidth: 0, mr: 1, justifyContent: 'center',}}
                                >
                                    <LoginIcon sx={{color: theme.palette.info.main}}/>
                                </ListItemIcon>
                                <ListItemText primary={"Login"} sx={{opacity: open ? 1 : 0}}/>
                            </ListItemButton>
                        )
                    )}
                </Box>

            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3,}}>
                <DrawerHeader/>
                {children}
            </Box>
        </Box>
    );
};
