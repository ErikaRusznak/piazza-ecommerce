import React from "react";
import {Box} from "@mui/material";
import { useTheme } from '@mui/material/styles';

type FilterComponentLayoutProps = {
    children: React.ReactNode;
    onClick?: (e:any) => any;
}
const FilterComponentLayout = ({children, onClick}:FilterComponentLayoutProps) => {
    const theme = useTheme();
    return (
        <Box sx={{
            width: 250,
            border: "1px solid #a5b4fc",
            borderRadius: "14px",
            mt:2, p:2,
            position: "absolute",
            top: 20,
            zIndex: 1000,
            backgroundColor: theme.palette.background.default,
        }}
        onClick={onClick}
        >
            {children}
        </Box>
    );
};

export default FilterComponentLayout;