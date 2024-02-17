import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import themes from "@/theme/themes";
import {baseURL} from "../../../../api/ApiClient";
import {Box} from "@mui/system";
import {useRouter} from "next/navigation";

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
        backgroundColor: 'rgba(24, 61, 61, 0.5)',
        borderRadius: 6,
        zIndex: 9999,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: themes().palette.info.main,
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: themes().palette.info.main,
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

const createQueryParam = (categoryName: string) => {
    const router = useRouter();
    const queryParams = new URLSearchParams()
    queryParams.set("categoryName", categoryName);
    const newSearch = queryParams.toString();
    router.push(`/products?${newSearch}`);
}

const SimpleMenu = ({text, menuItems }:SimpleMenuProps) => {

    const theme = themes();
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
                sx={{color: theme.palette.info.main, textTransform: "none", fontSize: "16px"}}
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
                                style={{filter: 'invert(100%)  '}}
                            />

                            <Box
                                onClick={() => {
                                    // createQueryParam(item.name);
                                    handleClose();
                                    router.push(`/${item.name}`)
                                }}
                            >
                                {item.name}
                            </Box>

                        </Box>

                    </MenuItem>
                ))}
            </StyledMenu>
        </div>
    );
}

export default SimpleMenu;