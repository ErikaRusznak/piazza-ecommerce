import React from "react";
import {Box} from "@mui/material";
import useTheme from "@/theme/themes";

type FilterComponentLayoutProps = {
    children: React.ReactNode;
    onClick?: () => void;
}
const FilterComponentLayout = ({children, onClick}:FilterComponentLayoutProps) => {
    const theme = useTheme();
    return (
        <Box sx={{
            width: 250,
            border: "1px solid #93B1A6",
            borderRadius: "14px",
            mt:2, p:2,
            position: "absolute",
            top: 20,
            zIndex: 1000,
            backgroundColor: theme.palette.background.darker,
        }}
        onClick={onClick}
        >
            {children}
        </Box>
    );
};

export default FilterComponentLayout;