import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {baseURL} from "components";
import {Box} from "@mui/system";
import {usePathname, useRouter} from "next/navigation";
import {Typography} from "@mui/material";
import {useThemeToggle} from "../../../../contexts/ThemeContext";

const StyledMenu = styled((props: MenuProps) => (

    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: 'rgba(255, 255, 255)',
        borderRadius: 6,
        zIndex: 9999,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.info.main,
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.info.main,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: "red",
            },
        },
    },
}));

type SimpleMenuProps = {
    text: string;
    menuItems: any[];
}

const createQueryParam = (categoryName: string, router: any, pathname: any) => {
    const queryParams = new URLSearchParams();
    queryParams.set("categoryName", categoryName);
    router.push(pathname + "?" + queryParams.toString());
}

const SimpleMenu = ({text, menuItems }:SimpleMenuProps) => {

    const pathname = usePathname();
    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                disableElevation
                onClick={handleClick}
                variant="text"
                sx={{color: theme.palette.info.main, textTransform: "uppercase", fontSize: "16px", px: 0, fontWeight: theme.typography.fontWeightRegular}}
                endIcon={<KeyboardArrowDownIcon sx={{ml: -1}}/>}
            >
                {text}
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {menuItems.map((item) => (
                    <MenuItem key={item.id} onClick={handleClose} disableRipple>
                        <Box sx={{display: "flex", gap: 2, alignItems: "center"}}>
                            <img
                                src={`${baseURL}${item.imageName}`}
                                alt={item.name}
                                width={30}
                                height={30}
                                style={{color: theme.palette.info.main}}
                            />
                            <Box
                                onClick={() => {
                                    createQueryParam(item.name, router, pathname);
                                    handleClose();
                                }}
                            >
                                <Typography color={isDark ? theme.palette.info.contrastText : theme.palette.info.main}>{item.name}</Typography>
                            </Box>

                        </Box>

                    </MenuItem>
                ))}
            </StyledMenu>
        </div>
    );
}

export default SimpleMenu;