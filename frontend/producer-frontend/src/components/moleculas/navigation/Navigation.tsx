import React, { useState, useEffect } from 'react';
import {Box, CssBaseline, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import useTheme from '@/theme/themes';
import DrawerComponent from './DrawerComponent';
import AppBarComponent from "@/components/moleculas/navigation/AppBarComponent";
import Divider from "@mui/material/Divider";

function InboxIcon() {
    return null;
}

function MailIcon() {
    return null;
}

const Navigation = ({ children }: { children: React.ReactNode }) => {
    const theme = useTheme();
    const smallerScreenSize = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(!smallerScreenSize);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setOpen(!smallerScreenSize);
    }, [smallerScreenSize]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarComponent open={open} handleDrawerOpen={handleDrawerOpen} />
            <DrawerComponent open={open} handleDrawerClose={handleDrawerClose} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
    );
};

export default Navigation;
