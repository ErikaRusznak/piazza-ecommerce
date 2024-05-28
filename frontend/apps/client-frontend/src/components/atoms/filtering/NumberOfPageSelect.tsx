import React from "react";
import {useTheme} from "@mui/material/styles";
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useThemeToggle} from "ui";

type NumberOfPageSelectProps = {
    handleItemsPerPageChange: (itemsPerPage: number) => void;
}

const NumberOfPageSelect = ({handleItemsPerPageChange}: NumberOfPageSelectProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();
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
                        backgroundColor: isDark ? theme.palette.background.lighter : "#edf0fe",
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
                {/*TODO - change style for selected menu item*/}
                <MenuItem
                    value={6}
                    sx={{
                        backgroundColor: isDark ? theme.palette.background.lighter : "#edf0fe",
                        color: theme.palette.info.main,
                        '&:hover': {
                            backgroundColor: isDark ? theme.palette.tertiary.main : theme.palette.lightColor.main,
                        },
                        '&.Mui-selected': {
                            backgroundColor: theme.palette.secondary.main,
                            "&:hover": {
                                backgroundColor: theme.palette.tertiary.main,
                            }
                        },
                    }}
                >
                    6 per page
                </MenuItem>
                <MenuItem
                    value={8}
                    sx={{
                        backgroundColor: isDark ? theme.palette.background.lighter : "#edf0fe",
                        color: theme.palette.info.main,
                        '&:hover': {
                            backgroundColor: isDark ? theme.palette.tertiary.main : theme.palette.lightColor.main,
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
                        backgroundColor: isDark ? theme.palette.background.lighter : "#edf0fe",
                        color: theme.palette.info.main,
                        '&:hover': {
                            backgroundColor: isDark ? theme.palette.tertiary.main : theme.palette.lightColor.main,
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