import React from 'react';
import IconButton from '@mui/material/IconButton';
import { styled, Theme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

type DrawerHeaderComponentProps = {
    handleDrawerClose: () => void;
}
const DrawerHeaderComponent = ({ handleDrawerClose }:DrawerHeaderComponentProps) => {
    return (
        <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
        </DrawerHeader>
    );
};

export default DrawerHeaderComponent;
