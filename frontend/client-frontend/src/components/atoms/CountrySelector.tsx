import React, {useState, useRef, useEffect} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";

import {COUNTRIES} from "./countries";
import {Button, Typography} from "@mui/material";
import {string} from "yup";
import useTheme from "@/theme/themes";

type SelectedValueType = {
    title: string; value: string;
}
type CountrySelectorType = {
    id: string;
    open: boolean;
    disabled?: boolean;
    onToggle: () => void;
    onChange: (val: string) => void;
    selectedValue: SelectedValueType | undefined;
}
export default function CountrySelector({id, open, disabled = false, onToggle, onChange, selectedValue}:CountrySelectorType) {
    const [query, setQuery] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const theme = useTheme();
    return (
        <div>
            <Box mt={1} sx={{position: "relative",zIndex:9999}}>
                <Button
                    type="button"
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #1a2747",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        height: "3.5rem",
                        backgroundColor: "a5b4fc",
                        position: "relative",
                        cursor: "default",
                        "&:focus": {
                            outline: "none",
                            borderColor: "#143232",
                        },
                    }}
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    onClick={(e) => {
                        onToggle();
                        handleClick(e);
                    }}
                    disabled={disabled}
                >

                    {selectedValue ? (
                        <>
                        <Avatar
                            alt={`${selectedValue?.value}`}
                            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue?.value}.svg`}
                            sx={{
                                marginRight: "8px",
                                width: "30px",
                                height:"30px",
                                display: "flex",
                                alignItems: "center"
                            }}
                        />
                        {selectedValue?.title}
                        </>
                    ) : (
                        <Typography sx={{
                            color: theme.palette.background.default,
                            textTransform: "none",
                            position: "absolute",
                            top: 0, left:0,
                            mt: 0.75, ml: 1.5,
                        }}>Country *</Typography>
                    )}

                </Button>

                <Popper
                    open={open}
                    anchorEl={anchorEl}
                    transition
                    disablePortal
                    placement="bottom-start"
                >
                    {({TransitionProps}) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper
                                elevation={5}
                                sx={{
                                    mt: 1,
                                    width: "100%",
                                    maxHeight: "300px",
                                    overflowY: "auto",
                                    backgroundColor: "white",
                                    dark: {backgroundColor: "#192235"},
                                }}
                            >
                                <List>
                                    {COUNTRIES.filter((country) =>
                                        country.title.toLowerCase().startsWith(query.toLowerCase())
                                    ).length === 0 ? (
                                        <ListItem>
                                            <ListItemText primary="No countries found"/>
                                        </ListItem>
                                    ) : (
                                        COUNTRIES.filter((country) =>
                                            country.title.toLowerCase().startsWith(query.toLowerCase())
                                        ).map((value, index) => (
                                            <ListItem
                                                key={`${id}-${index}`}
                                                onClick={() => {
                                                    onChange(value.value);
                                                    setQuery("");
                                                    onToggle();
                                                }}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        alt={`${value.value}`}
                                                        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.value}.svg`}
                                                        sx={{marginRight: "8px", height: "20px", width: "30px"}}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText primary={value.title}/>
                                                {value.value === selectedValue?.value && (

                                                    <CloseIcon fontSize="small"
                                                               sx={{color: "#1e90ff", paddingLeft: "8px"}}/>

                                                )}
                                            </ListItem>
                                        ))
                                    )}
                                </List>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </Box>
        </div>
    );
}
