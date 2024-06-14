import React, {useEffect} from "react";
import {Button, Slider, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import FilterComponentLayout from "@/components/templates/FilterComponentLayout";

type RangeFilterComponentProps = {
    onClickInside?: (e: any) => any;
    toggleRangeFilter?: () => void;
    handleRangeChanged: (priceFrom: number, priceTo: number) => void;
    getRangeFrom: number | null;
    getRangeTo: number | null;
    smallPageSize?: boolean;
};

const RangeFilterComponent = ({onClickInside, toggleRangeFilter, handleRangeChanged, getRangeFrom, getRangeTo, smallPageSize=false }: RangeFilterComponentProps) => {

    // TODO - find the smallest price and biggest price to put them in the RangeFilterComponent instead of 0 and 100
    const theme = useTheme();

    const [value, setValue] = React.useState<number[]>([getRangeFrom || 0, getRangeTo || 100]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    useEffect(() => {
        setValue([getRangeFrom || 0, getRangeTo || 100]);
    }, [getRangeFrom, getRangeTo]);

    return (
        <FilterComponentLayout
            onClick={onClickInside}
        >
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                sx={{color: theme.palette.lightColor.main}}
            />
            <Typography sx={{color: theme.palette.info.main}}>Price from: {value[0]} RON</Typography>
            <Typography sx={{color: theme.palette.info.main}}>Price to: {value[1]} RON</Typography>
            <Button
                variant="outlined"
                sx={{
                    borderColor: theme.palette.lightColor.main,
                    color: theme.palette.info.main,
                    "&:hover": { borderColor: theme.palette.primary.main },
                    fontSize: { xs: "5px", sm: "10px", md: "15px" },
                    mt:1,
                }}
                onClick={() => {
                    handleRangeChanged(value[0], value[1]);
                    if(toggleRangeFilter) toggleRangeFilter();
                }}
            >
                Save
            </Button>
        </FilterComponentLayout>
    );
};

export default RangeFilterComponent;