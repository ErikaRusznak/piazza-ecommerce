import React from "react";
import {Fade, Menu, MenuItem, MenuProps} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {styled} from "@mui/material/styles";
import {useThemeToggle} from "ui";

type OrderStatusPopoverProps = {
    open: boolean;
    anchorEl: HTMLButtonElement | null;
    handleClose: () => void;
    markedAsMessage: string;
    handleChange: () => void;
    markAsCancelled: () => void;
};
const StyledMenu = styled((props: MenuProps) => (
    <Menu
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        {...props}
    />
))(() => {
    const theme = useTheme();
    const {isDark} = useThemeToggle();
    return {
        '& .MuiPaper-root': {
            borderRadius: 6,
            minWidth: 280,
            backgroundColor: isDark ? theme.palette.background.lighter : "#DBE1FD",
            boxShadow: `
                rgba(255, 255, 255, 0.2) 1px 1px 2px 1px,
                rgba(0, 0, 0, 0.1) 0px 0px 2px 0px
            `,
            color: theme.palette.info.main,
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
        },
    };
});

const OrderStatusPopover = ({open, anchorEl, handleClose, markedAsMessage, handleChange, markAsCancelled}: OrderStatusPopoverProps) => {

    const handleStatusChange = () => {
        handleChange();
        handleClose();
    };

    const handleCancel = () => {
        markAsCancelled();
        handleClose();
    };


    return (
        <StyledMenu
            id="fade-menu"
            MenuListProps={{
                'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
        >
            <MenuItem sx={{"&:hover": {backgroundColor: "#121b32"}}} onClick={handleStatusChange}>
                {markedAsMessage}
            </MenuItem>
            <MenuItem sx={{"&:hover": {backgroundColor: "#121b32"}}} onClick={handleCancel}>Cancel the order</MenuItem>
        </StyledMenu>
    );
};

export default OrderStatusPopover;