import React, { useState } from "react";
import SearchBar from "@mkyy/mui-search-bar";
import useTheme from "@/theme/themes";
import {InputAdornment, IconButton, TextField} from "@mui/material";
import { SearchIcon } from "@/components/atoms/icons";
import { CssTextField } from "@/components/atoms/CssTextField";

type SearchComponentProps = {
    handleSearchChanged: (filterName: any, filterValue: any) => void;
    filterName: string;
};

const SearchComponent = ({ handleSearchChanged, filterName }: SearchComponentProps) => {
    const theme = useTheme();
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
                backgroundColor: theme.palette.background.lighter,
                opacity: 0.9,
                color: theme.palette.info.main,
                borderRadius: "14px",
                p: 0,

            }}
        />
    );
};

export default SearchComponent;
