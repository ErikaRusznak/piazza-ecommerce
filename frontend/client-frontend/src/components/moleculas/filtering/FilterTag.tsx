import React from "react";
import {Box, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import useTheme from "@/theme/themes";
import {ClearIcon} from "@/components/atoms/icons";

const FilterTag = ({ filterName, value, removeFilter }) => {

    const theme = useTheme();

    const customLabels = {
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
                        backgroundColor: theme.palette.primary.main,
                        border: "1px solid #93B1A6",
                        borderRadius: "8px",
                        paddingY: "4px",
                        paddingX: "6px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        color: theme.palette.info.main,
                    }}
                >
                    <Typography variant="body2">
                        {customLabels[filterName] || filterName}: {value}
                    </Typography>
                    <IconButton
                        sx={{
                            padding: 0,
                            pl: 1,
                            '&:hover': {
                                color: theme.palette.secondary.main,
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