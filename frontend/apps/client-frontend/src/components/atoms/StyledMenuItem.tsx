import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/system";
import themes from "@/theme/themes";
import {SxProps, Theme} from "@mui/material";

const StyledMenuItemDetails = styled(MenuItem)(({ theme }) => ({

}));

type StyledMenuItemProps = {
    value: number;
    children: React.ReactNode;
    sx?: SxProps<Theme>;
};

const StyledMenuItem = ({ value, children}:StyledMenuItemProps) => (
    <MenuItem
        value={value}
        sx={{
            backgroundColor: themes().palette.background.lighter,
            color: "white",
            '&:hover': {
                backgroundColor: themes().palette.primary.main,
            },
        }}
    >
        {children}
    </MenuItem>
);


export default StyledMenuItem;
