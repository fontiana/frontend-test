import React from 'react';
import {
  PercentageCell,
  SymbolCell,
  Table,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '../../assets/styles/WatchListTable';
import DashboardPriceBox from '../DashboardPriceBox';

interface WatchListProps {
  symbol: string;
  lastPrice: number;
  bidPrice: number;
  askPrice: number;
  priceChange: number;
}

interface DataProps {
  data: WatchListProps[];
}

export default function WatchListTable({data}: DataProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Symbol</TableHeaderCell>
          <TableHeaderCell>Last Price</TableHeaderCell>
          <TableHeaderCell>Bid Price</TableHeaderCell>
          <TableHeaderCell>Ask Price</TableHeaderCell>
          <TableHeaderCell>Price Change (%)</TableHeaderCell>
        </TableRow>
      </TableHead>
      <tbody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <SymbolCell>{item.symbol}</SymbolCell>
            <TableCell>{item.lastPrice}</TableCell>
            <TableCell>{item.bidPrice}</TableCell>
            <TableCell>{item.askPrice}</TableCell>
            <PercentageCell>
              <DashboardPriceBox priceChange={item.priceChange} />
            </PercentageCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}
