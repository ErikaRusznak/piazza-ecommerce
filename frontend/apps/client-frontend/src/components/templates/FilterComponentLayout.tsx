import React from "react";
import {Box} from "@mui/material";
import {useTheme} from "@mui/material/styles";

type FilterComponentLayoutProps = {
    children: React.ReactNode;
    onClick?: (e:any) => any;
    smallPageSize: boolean;
}
const FilterComponentLayout = ({children, onClick, smallPageSize}:FilterComponentLayoutProps) => {
    const theme = useTheme();
    return (
        <Box sx={{
            width: 250,
            border: "1px solid #a5b4fc",
            borderRadius: "14px",
            mt:2, p:2,
            position: smallPageSize ? "static" : "absolute",
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