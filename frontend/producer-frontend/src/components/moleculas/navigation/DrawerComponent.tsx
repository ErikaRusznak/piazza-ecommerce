import React from 'react';
import { CSSObject, Theme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import DrawerHeader from "@/components/moleculas/navigation/DrawerHeader";
import {Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, SxProps} from "@mui/material";
import {ArrowForwardIcon} from "@/components/atoms/icons";
import useTheme from "@/theme/themes";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

type DrawerComponentProps = {
    open: boolean;
    handleDrawerClose: () => void;
}

const DrawerComponent = ({ open, handleDrawerClose }:DrawerComponentProps) => {
    const theme = useTheme();

    // @ts-ignore
    const drawerStyles: SxProps<Theme> = {
        '& .MuiDrawer-paper': {
            ...(open ? openedMixin(theme) : closedMixin(theme)),
        },
    };

    return (
        <Drawer
            variant="permanent"
            open={open}
            sx={drawerStyles}
        >
            <DrawerHeader handleDrawerClose={handleDrawerClose} />
            <Divider />
            <List>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',

                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ArrowForwardIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ArrowForwardIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </List>
        </Drawer>
    );
};

export default DrawerComponent;
