import { ExchangeInfo } from '../../../../core/services';
import { IExchangeInfoObjectProps } from '../../../../core/models/IExchangeInfoObjectProps';
import { IExchangeInfoArrayProps } from '../../../../core/models/IExchangeInfoArrayProps';
import { useState, useEffect, useCallback } from 'react';
import CheckboxComponent from '../../../../core/components/checkbox/checkbox';
import SearchBar from '../../../../core/components/searchbar/searchbar';
import useWebSocket from 'react-use-websocket';
import List from '../list/list'
import * as S from './styled';

const SymbolsList = () => {
  const [data, setData] = useState<IExchangeInfoObjectProps>();
  const [searchQuery, setSearchQuery] = useState("");
  const [checked, setChecked] = useState<any>([]);

  const filterData = ({query, searchData}: any) => {
    if (!query) {
      return searchData?.symbols;
    } else {
      const dataFiltered = searchData.symbols.filter((d: IExchangeInfoArrayProps) => d.symbol.toLowerCase().includes(query));
      return dataFiltered
    }
  };

  const dataFiltered: [] = filterData({query: searchQuery, searchData: data});
  const socketUrl = 'wss://stream.binance.com:9443/stream';
	const { sendJsonMessage, lastJsonMessage } = useWebSocket(
		socketUrl,
	);

  const addToList = useCallback(() => {
      sendJsonMessage({
        method: 'SUBSCRIBE',
        params: checked.map((x: string) => `${x.toLowerCase()}@ticker`),
        id: 1,
      })},
    [sendJsonMessage, checked],
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await ExchangeInfo();
      setData(data);
    };
    fetchData();
  }, []);

    return (
      <>
        <S.SymbolsListWrapper>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <S.SymbolsListSymbolWrapper>
            <S.SymbolsListHeader>
              Symbol
            </S.SymbolsListHeader>
              {data ? (
                dataFiltered?.map(({symbol}, i) => i < 10 && (
                  <CheckboxComponent key={symbol} id={i.toString()} label={symbol} checkedSetter={setChecked} listChecked={checked}/>
                ))
               ) : (
                <S.SymbolsListNotFound>
                  Dados não encontrados!
                </S.SymbolsListNotFound>
              )}
          </S.SymbolsListSymbolWrapper>
          <S.SymbolsListAddButton type="submit" onClick={() => addToList()}>
            Add to List
          </S.SymbolsListAddButton>
        </S.SymbolsListWrapper>
        <List {...lastJsonMessage}/>
      </>
    );
  };

export default SymbolsList;