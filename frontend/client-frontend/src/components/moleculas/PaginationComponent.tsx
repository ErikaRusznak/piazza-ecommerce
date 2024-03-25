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
                    border: '1px solid #6366f1',
                },
                '& .MuiPaginationItem-page.Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.info.main,
                    border: '1px solid #a5b4fc',
                },
            }}
        />
    );
};

export default PaginationComponent;