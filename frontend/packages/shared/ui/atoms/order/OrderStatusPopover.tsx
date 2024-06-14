
import {Fade, Menu, MenuItem, MenuProps} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {styled} from "@mui/material/styles";
import {useThemeToggle} from "../../themes/ThemeContext";

type OrderStatusPopoverProps = {
    open: boolean;
    anchorEl: HTMLButtonElement | null;
    handleClose: () => void;
    markedAsMessage: string;
    handleChange: () => void;
    markAsCancelled?: () => void;
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
            backgroundColor: isDark ? theme.palette.background.lighter : theme.palette.background.default,
            boxShadow:`
                rgba(255, 255, 255, 0.2) 1px 1px 2px 1px,
                rgba(0, 0, 0, 0.1) 0px 0px 2px 0px
            `,
            color: theme.palette.info.main,
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            border: `1px solid ${!isDark && theme.palette.primary.main}`,
        },
    };
});

const OrderStatusPopover = ({open, anchorEl, handleClose, markedAsMessage, handleChange, markAsCancelled}: OrderStatusPopoverProps) => {

    const {isDark} = useThemeToggle();
    const handleStatusChange = () => {
        handleChange();
        handleClose();
    };

    const handleCancel = () => {
        if(markAsCancelled) {
            markAsCancelled();
            handleClose();
        }
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
            <MenuItem sx={{"&:hover": {backgroundColor: isDark ? "#121b32" : "#a5b4fc"}}} onClick={handleStatusChange}>
                {markedAsMessage}
            </MenuItem>
            {markAsCancelled && (
                <MenuItem sx={{"&:hover": {backgroundColor: isDark ? "#121b32" : "#a5b4fc"}}} onClick={handleCancel}>Cancel the order</MenuItem>
            )}
        </StyledMenu>
    );
};

export default OrderStatusPopover;