import React, {useContext, useEffect} from 'react';
import {
  Container,
  ListButton,
  ListContainer,
  StyledSelect,
} from '../../assets/styles/UserDashboard';
import {SymbolContext} from '../../contexts/SymbolContext';
import WatchListTable from '../WatchListTable';

interface DetailedSymbolDTO {
  symbol: string;
  lastPrice: number;
  bidPrice: number;
  askPrice: number;
  priceChange: string;
}

export default function UserDashboard() {
  const {
    createUserList,
    userLists,
    changeCurrentUserListIndex,
    currentUserListIndex,
    changeUserListState,
  } = useContext(SymbolContext);

  const serializedUserList = userLists.map(list => ({
    value: list.id,
    label: list.name,
  }));

  const handleListSelectChange = (value: number) => {
    changeCurrentUserListIndex(value - 1);
  };

  const BASE_URL = 'wss://stream.binance.com:9443/stream?streams=';

  const url =
    BASE_URL +
    userLists[currentUserListIndex].symbols
      .map(symbol => `${symbol.name.toLowerCase()}@ticker`)
      .join('/');

  useEffect(() => {
    if (userLists[currentUserListIndex].symbols.length > 0) {
      const socket = new WebSocket(url);

      socket.onopen = event => {
        console.log('Open watchlist websocket connection: ', event);
      };

      socket.onerror = event => {
        console.log('An error occurred: ', event);
      };

      socket.onmessage = event => {
        const {data} = JSON.parse(event.data);

        const formattedData: DetailedSymbolDTO = {
          symbol: data.s,
          lastPrice: parseFloat(Number(data.c).toFixed(4)),
          bidPrice: parseFloat(Number(data.b).toFixed(4)),
          askPrice: parseFloat(Number(data.a).toFixed(4)),
          priceChange: data.P,
        };

        changeUserListState(formattedData);
      };

      return () => {
        socket.close();

        socket.onclose = event => {
          console.log('Closed watchlist websocker connection: ', event);
        };
      };
    }
  }, [url, currentUserListIndex]);

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
      <WatchListTable data={userLists[currentUserListIndex].detailedSymbols} />
    </Container>
  );
}
