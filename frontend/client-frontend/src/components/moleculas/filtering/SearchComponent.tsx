import React, {useState} from "react";
import SearchBar from "@mkyy/mui-search-bar";
import useTheme from "@/theme/themes";
import {InputAdornment, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {SearchIcon} from "@/components/atoms/icons";
import {CssTextField} from "@/components/atoms/CssTextField";

type SearchComponentProps = {
    handleSearchChanged: (filterName: any, filterValue: any) => void;
    filterName: string;
}
const SearchComponent = ({handleSearchChanged, filterName }:SearchComponentProps) => {

    const theme = useTheme();
    const [textField, setTextField] = useState("");
    const handleSearch = (textField: string) => {
        console.log("textField", textField);
        handleSearchChanged(filterName, textField.toLowerCase());
        // setTextField("");
    };
    return (
        // <SearchBar
        //     value={textField}
        //     onChange={(newValue) => setTextField(newValue)}
        //     onSearch={handleSearch}
        //     // style={{
        //     //     backgroundColor: theme.palette.background.lighter,
        //     //     opacity: 0.9,
        //     //     color: theme.palette.info.main,
        //     // }}
        // />

        <CssTextField
            id="search-bar"
            className="text"
            onInput={(e) => {
                // @ts-ignore
                setTextField(e.target.value);
            }}
            variant="outlined"
            placeholder="Search..."
            size="small"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end" sx={{p: 0}}>
                        <IconButton type="submit" aria-label="search" sx={{padding: 0}}>
                            <SearchIcon style={{ fill: theme.palette.info.main, paddingRight: 0 }} />
                        </IconButton>
                    </InputAdornment>
                ),
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