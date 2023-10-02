import React, {useContext} from 'react';
import {
  Container,
  ListButton,
  ListContainer,
  StyledSelect,
} from '../../assets/styles/UserDashboard';
import {SymbolContext} from '../../contexts/SymbolContext';
import WatchListTable from '../WatchListTable';

interface WatchListProps {
  symbol: string;
  lastPrice: number;
  bidPrice: number;
  askPrice: number;
  priceChange: number;
}

const data: WatchListProps[] = [
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
      <WatchListTable data={data} />
    </Container>
  );
}
