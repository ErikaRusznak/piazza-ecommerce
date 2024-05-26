import React from "react";
import {Box, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useTheme} from "@mui/material/styles";
import {ClearIcon} from "@/components/atoms/icons";
import {useThemeToggle} from "../../../../contexts/ThemeContext";

type FilterTagProps = {
    filterName: string;
    value: string | number;
    removeFilter: () => void;
}

type CustomLabels = {
    priceTo: string;
    priceFrom: string;
    cityName: string;
    categoryName: string;
    productName: string;
};

const FilterTag = ({ filterName, value, removeFilter }: FilterTagProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();

    const customLabels: CustomLabels = {
        priceTo: "Price To",
        priceFrom: "Price From",
        cityName: "City",
        categoryName: "Category",
        productName: "Product"
    };

    return (
        <Box>
            {value ? (
                <Box
                    sx={{
                        backgroundColor: isDark ? theme.palette.primary.main : theme.palette.lightColor.main,
                        border: "1px solid #a5b4fc",
                        borderRadius: "8px",
                        paddingY: "4px",
                        paddingX: "6px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        color: theme.palette.info.main,
                        boxShadow: "0 1px 1px 1px #4338ca"
                    }}
                >
                    <Typography variant="body2">
                        {customLabels[filterName as keyof CustomLabels] || filterName}: {value}
                    </Typography>
                    <IconButton
                        sx={{
                            padding: 0,
                            pl: 1,
                            '&:hover': {
                                color: theme.palette.primary.main,
                            },
                        }}
                        onClick={removeFilter}
                    >
                        <ClearIcon sx={{ fontSize: "18px",}}/>
                    </IconButton>
                </Box>
            ) : null}
        </Box>
    );
};

export default FilterTag;