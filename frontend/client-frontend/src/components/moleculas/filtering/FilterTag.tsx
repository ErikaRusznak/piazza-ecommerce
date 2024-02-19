import React from "react";
import {Box, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";

const FilterTag = ({ filterName, value, removeFilter }) => {

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
                        backgroundColor: 'zinc.100',
                        border: '1px solid #93B1A6',
                        borderRadius: '8px',
                        paddingY: '4px',
                        paddingX: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: 'zinc.800',
                        '&:hover': {
                            backgroundColor: 'zinc.200',
                            border: '1px solid #93B1A6',
                        },
                    }}
                >
                    <Typography variant="body2">
                        {customLabels[filterName] || filterName}: {value}
                    </Typography>
                    <IconButton
                        sx={{
                            padding: '0',
                            '&:hover': {
                                color: 'zinc.800',
                            },
                        }}
                        onClick={removeFilter}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </IconButton>
                </Box>
            ) : null}
        </Box>
    );
};

export default FilterTag;