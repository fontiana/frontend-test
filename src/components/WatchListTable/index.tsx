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

interface DetailedSymbolDTO {
  symbol: string;
  lastPrice: number;
  bidPrice: number;
  askPrice: number;
  priceChange: string;
}

interface DataProps {
  data: Record<string, DetailedSymbolDTO>;
}

export default function WatchListTable({data}: DataProps) {
  const dataArray = Object.values(data);

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
        {dataArray.length > 0
          ? dataArray.map((item, index) => (
              <TableRow key={index}>
                <SymbolCell>{item.symbol}</SymbolCell>
                <TableCell>{item.lastPrice}</TableCell>
                <TableCell>{item.bidPrice}</TableCell>
                <TableCell>{item.askPrice}</TableCell>
                <PercentageCell>
                  <DashboardPriceBox priceChange={item.priceChange} />
                </PercentageCell>
              </TableRow>
            ))
          : []}
      </tbody>
    </Table>
  );
}
