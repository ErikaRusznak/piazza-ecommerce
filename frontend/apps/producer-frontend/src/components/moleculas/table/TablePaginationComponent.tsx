import React from "react";
import {TablePagination} from "@mui/material";
import {useTheme} from "@mui/material/styles";

type TablePaginationComponentProps = {
    totalNumberOfProducts: number;
    currentPage: number;
    itemsPerPage: number;
    setCurrentPage: (newCurrentPage: number) => void;
    setItemsPerPage: (newItemsPerPage: number) => void;
}
const TablePaginationComponent = ({totalNumberOfProducts, currentPage, itemsPerPage, setCurrentPage, setItemsPerPage}:TablePaginationComponentProps) => {

    const theme = useTheme();
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setCurrentPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    };

    return (
        <TablePagination
            component="div"
            count={totalNumberOfProducts}
            page={currentPage - 1}
            onPageChange={handleChangePage}
            rowsPerPage={itemsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10]}
            sx={{color: theme.palette.info.main}}
            slotProps={{
                actions: {
                    nextButton: {
                        disabled: currentPage >= Math.ceil(totalNumberOfProducts / itemsPerPage),
                        style: {
                            color: currentPage >= Math.ceil(totalNumberOfProducts / itemsPerPage) ? "rgba(255,255,255,0.5)" : theme.palette.info.main,
                        }
                    },
                    previousButton: {
                        disabled: currentPage === 1,
                        style: {
                            color: currentPage === 1 ? "rgba(255,255,255,0.5)" : theme.palette.info.main,
                        }
                    },
                },
                // select: {
                //     IconComponent: KeyboardArrowDownIcon,
                //     style: {color: theme.palette.info.main}
                // },
            }}
        />
    );
};

export default TablePaginationComponent;