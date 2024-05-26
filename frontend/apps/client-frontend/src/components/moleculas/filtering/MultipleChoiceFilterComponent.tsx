import React, {useEffect, useState} from "react";
import FilterComponentLayout from "@/components/templates/FilterComponentLayout";
import {useTheme} from "@mui/material/styles";
import {Box, Button, Checkbox} from "@mui/material";
import {FilterOptionKeys} from "@/components/organisms/filtering/FilteringComponent";

type MultipleChoiceFilterComponentProps = {
    onClickInside: (e: any) => any;
    toggleFilter: () => void;
    list: string[];
    handleListChanged: (filterName: FilterOptionKeys, filterValues: string[]) => void;
    filterName: string;
    getElementsNames: string[];
}

const MultipleChoiceFilterComponent = ({
                                           onClickInside,
                                           toggleFilter,
                                           list,
                                           handleListChanged,
                                           filterName,
                                           getElementsNames
                                       }: MultipleChoiceFilterComponentProps) => {

    const theme = useTheme();
    const [checkedElements, setCheckedElements] = useState<string[]>(getElementsNames || []);

    useEffect(() => {
        setCheckedElements(getElementsNames || []);
    }, [getElementsNames]);

    const handleCheck = (e: { target: { value: any; checked: any; }; }) => {
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
        handleListChanged(filterName as FilterOptionKeys, checkedElements);
        toggleFilter();
    };

    return (
        <FilterComponentLayout
            onClick={onClickInside}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
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
                                color: theme.palette.lightColor.main,
                                '&.Mui-checked': {
                                    color: theme.palette.lightColor.main,
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
                        borderColor: theme.palette.lightColor.main,
                        color: theme.palette.info.main,
                        "&:hover": {
                            borderColor: theme.palette.primary.main,
                        },
                        fontSize: {xs: "5px", sm: "10px", md: "15px"},
                        ml: 1.5
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