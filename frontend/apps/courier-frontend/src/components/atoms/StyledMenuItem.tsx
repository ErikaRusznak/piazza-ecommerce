import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { SxProps, Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type StyledMenuItemProps = {
    value: number;
    children: React.ReactNode;
    sx?: SxProps<Theme>;
};

const StyledMenuItem: React.FC<StyledMenuItemProps> = ({ value, children, sx }) => {
    const theme = useTheme();

    return (
        <MenuItem
            value={value}
            sx={{
                backgroundColor: theme.palette.background.lighter,
                color: "white",
                '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                },
                ...sx, // Merge custom styles passed via props
            }}
        >
            {children}
        </MenuItem>
    );
};

export default StyledMenuItem;
