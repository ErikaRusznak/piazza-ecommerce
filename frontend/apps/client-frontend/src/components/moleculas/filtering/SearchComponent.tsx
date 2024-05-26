import React, { useState } from "react";
import {useTheme} from "@mui/material/styles";
import {InputAdornment, IconButton, TextField} from "@mui/material";
import { SearchIcon } from "@/components/atoms/icons";
import {useThemeToggle} from "../../../../contexts/ThemeContext";

type SearchComponentProps = {
    handleSearchChanged: (filterName: any, filterValue: any) => void;
    filterName: string;
};

const SearchComponent = ({ handleSearchChanged, filterName }: SearchComponentProps) => {
    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const [textField, setTextField] = useState("");

    const handleSearch = () => {
        handleSearchChanged(filterName, textField.toLowerCase());
        setTextField("");
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
                // @ts-ignore
                setTextField(e.target.value);
            }}
            variant="outlined"
            placeholder="Search..."
            size="small"
            onKeyUp={handleKeyPress}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end" sx={{ p: 0 }}>
                        <IconButton
                            type="submit"
                            aria-label="search"
                            sx={{ padding: 0 }}
                            onClick={handleSearch}
                        >
                            <SearchIcon style={{ fill: theme.palette.info.main, paddingRight: 0 }} />
                        </IconButton>
                    </InputAdornment>
                ),
                style: {
                    color: theme.palette.info.main,
                },
            }}
            sx={{
                backgroundColor: isDark ? theme.palette.background.lighter : "#edf0fe",
                opacity: 0.9,
                color: theme.palette.info.main,
                borderRadius: isDark ? "14px" : "0px",
                p: 0,

            }}
        />
    );
};

export default SearchComponent;
