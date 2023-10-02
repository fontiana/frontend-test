import React, {useContext} from 'react';
import {
  Container,
  ListButton,
  ListContainer,
  PercentageCell,
  StyledSelect,
  SymbolCell,
  Table,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '../../assets/styles/UserDashboard';
import DashboardPriceBox from '../DashboardPriceBox';
import {SymbolContext} from '../../contexts/SymbolContext';

interface TableProps {
  symbol: string;
  lastPrice: number;
  bidPrice: number;
  askPrice: number;
  priceChange: number;
}

const data: TableProps[] = [
  {
    symbol: 'AAPL',
    lastPrice: 150.25,
    bidPrice: 150.1,
    askPrice: 150.4,
    priceChange: -0.5,
  },
  {
    symbol: 'GOOGL',
    lastPrice: 2700.75,
    bidPrice: 2700.5,
    askPrice: 2701.0,
    priceChange: 0.7,
  },
  {
    symbol: 'MSFT',
    lastPrice: 305.6,
    bidPrice: 305.55,
    askPrice: 305.65,
    priceChange: 0.2,
  },
];

export default function UserDashboard() {
  const {createUserList, userLists, changeCurrentUserListIndex} =
    useContext(SymbolContext);

  const serializedUserList = userLists.map(list => ({
    value: list.id,
    label: list.name,
  }));

  const handleListSelectChange = (value: number) => {
    changeCurrentUserListIndex(value - 1);
  };

  return (
    <Container>
      <ListContainer>
        <StyledSelect
          defaultValue={1}
          bordered={false}
          options={serializedUserList}
          onChange={handleListSelectChange}
        />
        <ListButton onClick={createUserList}>+</ListButton>
      </ListContainer>
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
    </Container>
  );
}
