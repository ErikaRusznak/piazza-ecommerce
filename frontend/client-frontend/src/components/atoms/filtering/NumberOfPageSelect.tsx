import React, {useEffect} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useTheme from "@/theme/themes";
import {Box, useMediaQuery} from "@mui/material";

const NumberOfPageSelect = ({itemsPerPage, setItemsPerPage, handleItemsPerPageChange}) => {

    const theme = useTheme();
    // const breakpoint = useBreakpoint();
    //
    // useEffect(() => {
    //     setItemsPerPage(12);
    // }, [breakpoint]);
    const isXSmallScreen = useMediaQuery(theme.breakpoints.between('xxs', 'xs'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isXLargeScreen = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    const isXXLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

    return (
        // <Box sx={{ maxWidth: 200 }}>
            <FormControl fullWidth sx={{maxWidth: 200}} size={"small"}>
                <InputLabel
                    id="demo-simple-select-label"
                    sx={{
                        color: theme.palette.primary.main,
                        marginBottom: 1,
                        '&.Mui-focused': {
                            color: theme.palette.primary.main,
                        },
                    }}
                >
                    Items per page</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={itemsPerPage}
                    label="Items per page"
                    onChange={handleItemsPerPageChange}
                    sx={{
                        '& .MuiSelect-select': {
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.info.main,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                        },

                    }}
                >
                    {/*{!isXSmallScreen && (*/}
                    {/*    <MenuItem value="6" sx={{color: "red"}}>6 per page</MenuItem>*/}
                    {/*)}*/}
                    {/*{!isSmallScreen && (*/}
                    {/*    <MenuItem value="8">8 per page</MenuItem>*/}
                    {/*)}*/}
                    {/*{!isMediumScreen && (*/}
                    {/*    <MenuItem value="12">12 per page</MenuItem>*/}
                    {/*)}*/}
                </Select>
            </FormControl>
        // </Box>
    );
};

export default NumberOfPageSelect;