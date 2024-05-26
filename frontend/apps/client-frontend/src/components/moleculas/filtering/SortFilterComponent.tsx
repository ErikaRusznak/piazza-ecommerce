import React from "react";
import FilterComponentLayout from "@/components/templates/FilterComponentLayout";
import {Box, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {SortFilter} from "@/app/shop/page";

type SortFilterComponentProps = {
    onSortChanged: (newSortFilter: SortFilter) => void;
}

const SortFilterComponent = ({onSortChanged}: SortFilterComponentProps) => {

    const theme = useTheme();
    const handleSortClick = (criteria: "productPrice" | "productName", orderSort: "asc" | "desc") => {
        const newSort = { criteria, orderSort }
        onSortChanged(newSort);
    };

    return (
        <FilterComponentLayout>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            cursor: "pointer",
                            color: theme.palette.info.main,
                        }}
                    >
                        {/*TODO - create component for every box*/}
                        <Box
                            sx={{
                                "&:hover": {
                                    backgroundColor: theme.palette.background.lighter,
                                },
                                pb: 1,
                                borderBottom: "1px solid #a5b4fc",
                            }}
                            onClick={() => handleSortClick("productPrice", "asc")}
                        >
                            <Typography sx={{fontSize: "18px"}}>Price: ascending</Typography>
                        </Box>
                        <Box
                            sx={{
                                "&:hover": {
                                    backgroundColor: theme.palette.background.lighter,
                                },
                                py: 1,
                                borderBottom: "1px solid #a5b4fc",
                            }}
                            onClick={() => handleSortClick("productPrice", "desc")}
                        >
                            <Typography sx={{fontSize: "18px"}}>Price: descending</Typography>
                        </Box>
                        <Box
                            sx={{
                                "&:hover": {
                                    backgroundColor: theme.palette.background.lighter,
                                },
                                py: 1,
                                borderBottom: "1px solid #a5b4fc",
                            }}
                            onClick={() => handleSortClick("productName", "asc")}
                        >
                            <Typography sx={{fontSize: "18px"}}>Name: ascending</Typography>
                        </Box>
                        <Box
                            sx={{
                                "&:hover": {
                                    backgroundColor: theme.palette.background.lighter,
                                },
                                pt: 1,
                            }}
                            onClick={() => handleSortClick("productName", "desc")}
                        >
                            <Typography sx={{fontSize: "18px"}}>Name: descending</Typography>
                        </Box>
                    </Box>
        </FilterComponentLayout>
    );
};

export default SortFilterComponent;