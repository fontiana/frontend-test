import { useState, useCallback } from "react";
import { useExchangeInfo } from "../../context/useExchangeInfo";
import * as S from "./styles";
import useWebSocket from "react-use-websocket";

interface WebSocketMessage {
  stream: string;
  data: any;
  // TODO: increase more details about object WebSocketMessage
}

const ListSymbols = () => {
  const [exchangesInfo, setExchangesInfo] = useState<any[]>([]);

  const { exchanges } = useExchangeInfo();

  const symbolList = exchanges
    ?.map((symbol) => symbol.symbol.toLowerCase())
    .join("@ticker/");
  const wsUrl = `wss://stream.binance.com:9443/stream?streams=${symbolList}`;

  const { lastJsonMessage } = useWebSocket<WebSocketMessage>(wsUrl, {
    onOpen: () => console.log(`Connected to App WS`),
    onError: (event) => {
      console.error(event);
    },
    onMessage: () => {
      if (lastJsonMessage) {
        setExchangesInfo((prev) => ({
          ...prev,
          [lastJsonMessage.stream]: { ...lastJsonMessage.data },
        }));
      }
    },
    shouldReconnect: () => true,
    reconnectInterval: 10,
  });

  const formatNumberToFixed = useCallback(
    (value: string, decimalPlaces: number = 4) => {
      return parseFloat(value).toFixed(decimalPlaces);
    },
    []
  );

  const formatPercentage = useCallback((value: number) => {
    return (value * 10000).toFixed(2);
  }, []);

  return (
    <S.Wrapper>
      <S.WrapperOfListUser>
        <S.WrapperNewList>
          <S.SelectList name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </S.SelectList>
          <S.ButtonAddList>+</S.ButtonAddList>
        </S.WrapperNewList>
        <S.WrapperNewList>
          <S.Field />
          <S.Button value="Add" />
        </S.WrapperNewList>
      </S.WrapperOfListUser>

      <S.Table>
        <S.TableHead>
          <tr>
            <S.TableHeaderCell>Symbol</S.TableHeaderCell>
            <S.TableHeaderCell>Last Price</S.TableHeaderCell>
            <S.TableHeaderCell>Bid Price</S.TableHeaderCell>
            <S.TableHeaderCell>Ask Price</S.TableHeaderCell>
            <S.TableHeaderCell>Price Change (%)</S.TableHeaderCell>
          </tr>
        </S.TableHead>
        <tbody>
          {Object.entries(exchangesInfo)?.map(([key, value]) => (
            <S.TableRow key={key}>
              <td>{value.s}</td>
              <S.TableCell>{formatNumberToFixed(value.c)}</S.TableCell>
              <S.TableCell>{formatNumberToFixed(value.b)}</S.TableCell>
              <S.TableCell>{formatNumberToFixed(value.a)}</S.TableCell>
              <S.TableCell isPositive={parseFloat(value.p) * 10000}>
                {formatPercentage(value.p)}
              </S.TableCell>
            </S.TableRow>
          ))}
        </tbody>
      </S.Table>
    </S.Wrapper>
  );
};

export default ListSymbols;
