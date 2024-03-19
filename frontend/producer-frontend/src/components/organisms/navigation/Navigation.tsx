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
import useTheme from "@/theme/themes";
import {
    CategoryIcon, ChatIcon,
    ChevronLeftIcon,
    ChevronRightIcon, LoginIcon, LogoutIcon,
    MenuIcon, NotificationsIcon, PersonIcon, SettingsIcon,
    ShoppingCartCheckoutIcon
} from "@/components/atoms/icons";
import {Button, useMediaQuery} from "@mui/material";
import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useAuth} from "../../../../api/auth/AuthContext";

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

        return {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            '& .MuiDrawer-paper.MuiDrawer-paperAnchorLeft': {
                backgroundColor: theme.palette.background.default,
                borderRightColor: theme.palette.background.lighter,
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


export default function Navigation({children}: { children: React.ReactNode }) {
    const theme = useTheme();
    const smallerScreenSize = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);

    const {isAuthenticated, logout} = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const informationList = [
        {label: "Products", icon: <CategoryIcon sx={{color: theme.palette.info.main}}/>, href: "/products"},
        {label: "Orders", icon: <ShoppingCartCheckoutIcon sx={{color: theme.palette.info.main}}/>, href: "/orders"},
        {label: "Chat", icon: <ChatIcon sx={{color: theme.palette.info.main}}/>, href: "/chats"}
    ];

    const profileList = [
        {label: "Profile", icon: <PersonIcon sx={{color: theme.palette.info.main}}/>, href: "/profile"},
        {
            label: "Notifications",
            icon: <NotificationsIcon sx={{color: theme.palette.info.main}}/>,
            href: "/notifications"
        },
        {label: "Settings", icon: <SettingsIcon sx={{color: theme.palette.info.main}}/>, href: "/settings"}
    ];

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
                <Toolbar sx={{backgroundColor: theme.palette.background.lighter}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Mini variant drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Box sx={{}}>
                    <DrawerHeader sx={{}}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon sx={{color: theme.palette.info.main}}/> :
                                <ChevronLeftIcon sx={{color: theme.palette.info.main}}/>}
                        </IconButton>
                    </DrawerHeader>
                </Box>
                <Divider sx={{backgroundColor: theme.palette.background.lighter}}/>
                <List>
                    {informationList.map((listItem) => (
                        <ListItem key={listItem.label} disablePadding sx={{display: 'block'}} className={pathname === listItem.href ? "ActiveLink" : ""}>
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
                <Divider sx={{backgroundColor: theme.palette.background.lighter}}/>
                <List>
                    {profileList.map((listItem) => (
                        <ListItem key={listItem.label} disablePadding sx={{display: 'block'}} className={pathname === listItem.href ? "ActiveLink" : ""}>
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
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',

                                }}
                                onClick={() => {
                                    logout();
                                    router.push("/")
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: 1,
                                        justifyContent: 'center',
                                    }}
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
                                    sx={{
                                        minWidth: 0,
                                        mr: 1,
                                        justifyContent: 'center',
                                    }}
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
}