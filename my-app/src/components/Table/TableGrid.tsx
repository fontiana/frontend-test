import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export type Column = {
  id: "symbol" | "last_price" | "bid_price" | "ask_price" | "price_change";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
};

export interface Data {
  symbol: string;
  last_price: string;
  bid_price: string;
  ask_price: string;
  price_change: string;
}

type Props = {
  columns: Column[];
  rows: Data[];
  onClickRow?: (rowId: string) => void;
  tableWidth?: string;
  noPagination?: boolean;
  rowsQntyPerPage?: number;
};

export default function StickyHeadTable({
  columns,
  rows,
  onClickRow,
  tableWidth = "100%",
  noPagination = false,
  rowsQntyPerPage = 10,
}: Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsQntyPerPage);
  const [selectedRow, setSelecteRow] = React.useState("");

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickRow = (rowId: string) => {
    onClickRow?.(rowId);
    setSelecteRow(rowId);
  };

  return (
    <Paper sx={{ width: `${tableWidth}`, overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead style={{ backgroundColor: "#1B1F38" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#c4dbe5",
                  }}
                >
                  <span style={{ fontWeight: "700", fontSize: "12px" }}>
                    {column.label}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClickRow(row.symbol)}
                    hover
                    selected={row.symbol === selectedRow}
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {!noPagination && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
