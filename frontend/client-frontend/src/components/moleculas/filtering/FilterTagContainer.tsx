import React from "react";
import {Box, Button} from "@mui/material";
import FilterTag from "@/components/moleculas/filtering/FilterTag";

const FilterTagContainer = ({ filterTags, removeFilterOneOption, removeFilterMultipleOptions, removeAllTags }) => {

    return (
        <Box
            sx={{
                backgroundColor: 'zinc.200',
                border: '1px solid #93B1A6',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
                marginY: '5px',
            }}
        >
            <Box
                sx={{
                    display: 'inline-flex',
                    gap: '3px',
                    flexWrap: 'wrap',
                }}
            >
                {filterTags.map((tag, index) => (
                    <Box key={index} sx={{ display: 'inline-flex', gap: '3px' }}>
                        {Array.isArray(tag.value) ? (
                            tag.value.map((value, valueIndex) => (
                                <FilterTag
                                    key={valueIndex}
                                    filterName={tag.filterName}
                                    value={value}
                                    removeFilter={() => removeFilterMultipleOptions(tag.filterName, value)}
                                />
                            ))
                        ) : (
                            <Box>
                                <FilterTag
                                    filterName={tag.filterName}
                                    value={tag.value}
                                    removeFilter={() => removeFilterOneOption(tag.filterName)}
                                />
                            </Box>
                        )}
                    </Box>
                ))}
            </Box>
            <Box sx={{ flexGrow: 1 }} /> {/* Add a flex-grow element to push the button to the end */}
            <Box sx={{ flex: 'justify-end' }}>
                <Button
                    variant="outlined"
                    sx={{
                        fontWeight: 'semibold',
                        color: 'zinc.800',
                        '&:hover': {
                            backgroundColor: 'zinc.100',
                        },
                        borderRadius: '16px',
                        px: '8px',
                        py: '4px',
                    }}
                    onClick={removeAllTags}
                >
                    Clear All
                </Button>
            </Box>
        </Box>
    );
};

export default FilterTagContainer;