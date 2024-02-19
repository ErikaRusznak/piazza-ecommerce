import React, {useState} from "react";
import FilterComponentLayout from "@/components/templates/FilterComponentLayout";
import useTheme from "@/theme/themes";
import {Box, Button, Checkbox} from "@mui/material";

const MultipleChoiceFilterComponent = ({onClickInside, toggleFilter, list, handleListChanged, filterName, getElementsNames}) => {

    const theme = useTheme();
    const [checkedElements, setCheckedElements] = useState(getElementsNames || []);

    const handleCheck = (e) => {
        const element = e.target.value;
        let updatedList = [...checkedElements];
        if (e.target.checked && !checkedElements.includes(element)) {
            updatedList = [...checkedElements, element];
        } else {
            updatedList = updatedList.filter((item) => item !== element);
        }
        setCheckedElements(updatedList);
    };

    const handleClickOnSave = () => {
        handleListChanged(filterName, checkedElements);
        toggleFilter();
    };

    return (
        <FilterComponentLayout
            onClick={onClickInside}
        >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                    }}
                >
                    {list.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Checkbox
                                value={item}
                                color="primary"
                                checked={checkedElements.includes(item)}
                                onChange={handleCheck}
                                sx={{
                                    color: theme.palette.info.main,
                                    '&.Mui-checked': {
                                        color: theme.palette.primary.main,
                                    },
                                }}
                            />
                            <span
                                style={{
                                    marginLeft: '5px',
                                    color: theme.palette.info.main,
                                }}
                            >
                  {item}
                </span>
                        </Box>
                    ))}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'start',
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: theme.palette.background.lighter,
                            color: theme.palette.info.main,
                            "&:hover": { borderColor: theme.palette.background.default },
                            fontSize: { xs: "5px", sm: "10px", md: "15px" },
                        }}
                        onClick={() => {
                            handleClickOnSave();
                        }}
                    >
                        Save
                    </Button>
                </Box>
        </FilterComponentLayout>
    );
};

export default MultipleChoiceFilterComponent;