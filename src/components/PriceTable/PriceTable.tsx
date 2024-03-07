import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function createData(
  symbol: string,
  lastPrice: number,
  bidPrice: number,
  askPrice: number,
  priceChange: number // TODO: Vai ser um icone
) {
  return { symbol, lastPrice, bidPrice, askPrice, priceChange };
}

const rows = [
  createData("ETHBC", 159, 6.0, 24, 4.0),
  createData("ETHBC", 237, 9.0, 37, 4.3),
  createData("ETHBC", 262, 16.0, 24, 6.0),
  createData("ETHBC", 305, 3.7, 67, 4.3),
  createData("ETHBC", 356, 16.0, 49, 3.9),
];

export const PriceTable = () => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell align="right">Last Price</TableCell>
            <TableCell align="right">Bid Price&nbsp;</TableCell>
            <TableCell align="right">Ask Price&nbsp;</TableCell>
            <TableCell align="right">Price Change&nbsp;(%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.symbol}>
              <TableCell component="th" scope="row">
                {row.symbol}
              </TableCell>
              <TableCell align="right">{row.lastPrice}</TableCell>
              <TableCell align="right">{row.bidPrice}</TableCell>
              <TableCell align="right">{row.askPrice}</TableCell>
              <TableCell align="right">{row.priceChange}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
