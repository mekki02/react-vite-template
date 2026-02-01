import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import type { JSX } from "react";

export interface Header<T> {
    columnKey: keyof T;
    label: string;
    render?: (row: T) => JSX.Element;
    cellProps?: Record<string, any>;
}

export interface DataTableProps<T> {
    headers: Header<T>[];
    data: T[];
    page?: number;
    rowsPerPage?: number;
    totalCount?: number;
    onPageChange?: (page: number) => void;
    handleRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    emptyStateMessage?: string;
    className?: string;
    style?: React.CSSProperties;
    customPagination?: JSX.Element;
}

export function DataTable<T>({
    headers,
    data,
    page = 1,
    rowsPerPage = 5,
    totalCount,
    onPageChange,
    handleRowsPerPageChange,
    emptyStateMessage = "No data found.",
    className,
    style,
    customPagination,
}: DataTableProps<T>) {
    return (
        <Paper
            elevation={3}
            className={className}
            style={style}
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                overflow: "hidden",
                minWidth: 0,
            }}
        >
            <TableContainer sx={{ flex: 1, overflowY: "auto" }}>
                <Table stickyHeader size="medium">
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell
                                    key={String(header.columnKey)}
                                    {...header.cellProps}
                                >
                                    {header.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={headers.length}
                                    align="center"
                                    sx={{ py: 5 }}
                                >
                                    {emptyStateMessage}
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {headers.map((header) => (
                                        <TableCell
                                            key={String(header.columnKey)}
                                            {...header.cellProps}
                                        >
                                            {header.render
                                                ? header.render(row)
                                                : String(row[header.columnKey])}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                customPagination ?
                    <Box
                        sx={{ p: 1, display: "flex", justifyContent: "flex-end", gap: 2 }}
                    >
                        {customPagination}
                    </Box> :
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[5, 10, 25]}
                        rowsPerPage={rowsPerPage}
                        count={totalCount || 0}
                        page={page - 1} // Adjust for 0-based index
                        onPageChange={(_, newPage) => onPageChange?.(newPage + 1)} // Convert back to 1-based index
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
            }
        </Paper>
    );
}
