import React from "react";
import {Pagination} from "@mui/material";
import useTheme from "@/theme/themes";

type PaginationComponentProps = {
    numberOfPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}
const PaginationComponent = ({numberOfPages, currentPage, setCurrentPage}:PaginationComponentProps) => {
    const theme = useTheme();

    return (
        <Pagination
            count={numberOfPages}
            defaultPage={1}
            page={currentPage}
            variant="outlined"
            color="primary"
            onChange={(e, page) => {
                setCurrentPage(page);
            }}
            sx={{
                mb: 3,
                '& .MuiPaginationItem-root': {
                    color: theme.palette.info.main,
                    border: '1px solid #93B1A6',
                },
                '& .MuiPaginationItem-page.Mui-selected': {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.info.main,
                    border: '1px solid #93B1A6',
                },
            }}
        />
    );
};

export default PaginationComponent;