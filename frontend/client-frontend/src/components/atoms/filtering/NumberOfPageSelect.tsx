import React from "react";
import useTheme from "@/theme/themes";
import {FormControl, InputLabel, Select, useMediaQuery} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

type NumberOfPageSelectProps = {
    handleItemsPerPageChange: (itemsPerPage: number) => void;
}

const NumberOfPageSelect = ({handleItemsPerPageChange}: NumberOfPageSelectProps) => {

    const theme = useTheme();
    const [values, setValues] = React.useState({
        itemsPerPage: "",
        name: "hai"
    });

    const handleChange = (event: any) => {
        const { value } = event.target;
        setValues((oldValues) => ({
            ...oldValues,
            itemsPerPage: value as string,
        }));
        handleItemsPerPageChange(value);
    };

    const isXSmallScreen = useMediaQuery(theme.breakpoints.between('xxs', 'xs'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isXLargeScreen = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    const isXXLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

    return (
        <FormControl fullWidth sx={{width: 200}} size={"small"}>
            <InputLabel
                htmlFor="items-per-page"
                sx={{
                    color: theme.palette.primary.main,
                    marginBottom: 1,
                    '&.Mui-focused': {
                        color: theme.palette.primary.main,
                    },
                }}
            >
                Items per page
            </InputLabel>
            <Select
                value={values.itemsPerPage}
                onChange={handleChange}
                MenuProps={{MenuListProps: {disablePadding: true}}}
                inputProps={{
                    name: "itemsPerPage",
                    id: "items-per-page"
                }}
                sx={{
                    '& .MuiSelect-select': {
                        backgroundColor: theme.palette.background.lighter,
                        color: theme.palette.info.main,
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.background.lighter,
                        },
                    },
                }}
            >
                {/*TODO - try to put the menu item in a separate component, idk why it was not working*/}
                <MenuItem
                    value={6}
                    sx={{
                        backgroundColor: theme.palette.background.lighter,
                        color: "white",
                        '&:hover': {
                            backgroundColor: theme.palette.primary.main,
                        },
                        '&.Mui-selected': {
                            backgroundColor: theme.palette.secondary.main,
                            "&:hover": {
                                backgroundColor: theme.palette.primary.main,
                            }
                        },
                    }}
                >
                    6 per page
                </MenuItem>
                <MenuItem
                    value={8}
                    sx={{
                        backgroundColor: theme.palette.background.lighter,
                        color: "white",
                        '&:hover': {
                            backgroundColor: theme.palette.primary.main,
                        },
                        '&.Mui-selected': {
                            backgroundColor: theme.palette.secondary.main,
                        },
                    }}
                >
                    8 per page
                </MenuItem>
                <MenuItem
                    value={12}
                    sx={{
                        backgroundColor: theme.palette.background.lighter,
                        color: "white",
                        '&:hover': {
                            backgroundColor: theme.palette.primary.main,
                        },
                        '&.Mui-selected': {
                            backgroundColor: theme.palette.secondary.main,
                        },
                    }}
                >
                    12 per page
                </MenuItem>
            </Select>
        </FormControl>

    );
};

export default NumberOfPageSelect;