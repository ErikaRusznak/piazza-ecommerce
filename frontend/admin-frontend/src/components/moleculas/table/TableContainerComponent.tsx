import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import useTheme from "@/theme/themes";

type TableContainerProps<T> = {
    items: T[];
    tableCellLabels: string[];
    renderCell: (item: T, key: string) => React.ReactNode;
}
const TableContainerComponent = <T,>({items, tableCellLabels, renderCell}:TableContainerProps<T>) => {

    const theme = useTheme();
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {tableCellLabels.map((tableCellLabel:string, index: number) => (
                            <TableCell key={index} sx={{
                                color: theme.palette.info.main,
                                textTransform: "uppercase", fontWeight: "bold",
                            }}>
                                {tableCellLabel}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items?.map((item:any, index:number) => (
                        <TableRow key={index}>
                            {tableCellLabels.map((key: string, index: number) => (
                                <TableCell key={index} sx={{
                                    color: theme.palette.info.main
                                }}>
                                    {renderCell(item, key)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
};

export default TableContainerComponent;