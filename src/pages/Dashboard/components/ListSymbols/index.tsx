import { useState } from "react";
import { useExchangeInfo } from "../../context/useExchangeInfo";
import * as S from "./styles";
import useWebSocket from "react-use-websocket";

interface WebSocketMessage {
  stream: string;
  data: any;
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
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 1000,
  });

  return (
    <S.Wrapper>
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
              <S.SymbolCell>{value.s}</S.SymbolCell>
              <S.TableCell>{parseFloat(value.c).toFixed(4)}</S.TableCell>
              <S.TableCell>{parseFloat(value.b).toFixed(4)}</S.TableCell>
              <S.TableCell>{parseFloat(value.a).toFixed(4)}</S.TableCell>
              <S.TableCell>{(value.p * 10000).toFixed(2)}</S.TableCell>
            </S.TableRow>
          ))}
        </tbody>
      </S.Table>
    </S.Wrapper>
  );
};

export default ListSymbols;
