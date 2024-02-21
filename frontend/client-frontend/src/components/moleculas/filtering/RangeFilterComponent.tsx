import React from "react";
import {Button, Slider, Typography} from "@mui/material";
import useTheme from "@/theme/themes";
import FilterComponentLayout from "@/components/templates/FilterComponentLayout";

type RangeFilterComponentProps = {
    onClickInside: (e: any) => any;
    toggleRangeFilter: () => void;
    handleRangeChanged: (priceFrom: number, priceTo: number) => void;
    getRangeFrom: number | null;
    getRangeTo: number | null;
};

const RangeFilterComponent = ({onClickInside, toggleRangeFilter, handleRangeChanged, getRangeFrom, getRangeTo }: RangeFilterComponentProps) => {

    const theme = useTheme();

    const [value, setValue] = React.useState<number[]>([getRangeFrom || 0, getRangeTo || 100]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <FilterComponentLayout
            onClick={onClickInside}
        >
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                sx={{color: theme.palette.primary.light}}
            />
            <Typography sx={{color: theme.palette.info.main}}>Price from: {value[0]} RON</Typography>
            <Typography sx={{color: theme.palette.info.main}}>Price to: {value[1]} RON</Typography>
            <Button
                variant="outlined"
                sx={{
                    borderColor: theme.palette.background.lighter,
                    color: theme.palette.info.main,
                    "&:hover": { borderColor: theme.palette.background.default },
                    fontSize: { xs: "5px", sm: "10px", md: "15px" },
                }}
                onClick={() => {
                    handleRangeChanged(value[0], value[1]);
                    toggleRangeFilter();
                }}
            >
                Save
            </Button>
        </FilterComponentLayout>
    );
};

export default RangeFilterComponent;