import React from "react";
import {Box, Button} from "@mui/material";
import FilterTag from "@/components/moleculas/filtering/FilterTag";
import useTheme from "@/theme/themes";
import Tag from "@/components/atoms/filtering/Tag";

type FilterTagContainerProps = {
    filterTags: Tag[];
    removeFilterOneOption: (filterNameToRemove: string) => void;
    removeFilterMultipleOptions: (filterNameToRemove: string, valueToRemove: string) => void;
    removeAllTags: () => void;
}
const FilterTagContainer = ({ filterTags, removeFilterOneOption, removeFilterMultipleOptions, removeAllTags }:FilterTagContainerProps) => {

    const theme = useTheme();
    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.default,
                border: "1px solid #93B1A6",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                padding: "4px",
                marginY: "5px",
            }}
        >
            <Box
                sx={{
                    display: "inline-flex",
                    gap: "3px",
                    flexWrap: "wrap",
                }}
            >
                {filterTags.map((tag, index) => (
                    <Box key={index} sx={{ display: "inline-flex", gap: "3px" }}>
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
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flex: "justify-end" }}>
                <Button
                    variant="outlined"
                    sx={{
                        color: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                        "&:hover": {
                            borderColor: theme.palette.secondary.main,
                            color: theme.palette.secondary.main,
                        },
                        borderRadius: "16px",
                        px: "8px",
                        py: "4px",
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