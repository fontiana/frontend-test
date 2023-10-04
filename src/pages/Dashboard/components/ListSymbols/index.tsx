import { useState, useCallback, ChangeEvent, useEffect } from "react";
import { useExchangeInfo } from "../../context/useExchangeInfo";
import * as S from "./styles";
import useWebSocket from "react-use-websocket";
import { useForm, SubmitHandler } from "react-hook-form";
import { ACTION_TYPE } from "../../context/useExchangeInfo/actions";

interface WebSocketMessage {
  stream: string;
  data: any;
  // TODO: increase more details about object WebSocketMessage
}

type Inputs = {
  listName: string;
  listOfExchanges: string;
};

const ListSymbols = () => {
  const [exchangesInfo, setExchangesInfo] = useState<any[]>([]);
  const [showAddNewList, setShowAddNewList] = useState(false);

  const { exchanges, dispatchExchanges } = useExchangeInfo();
  const [selectedOption, setSelectedOption] = useState(exchanges.currentList);
  const { register, handleSubmit } = useForm<Inputs>();

  const symbolList =
    exchanges.currentList !== "" &&
    Object.values(exchanges.lists[exchanges.currentList])
      ?.map((symbol: any) => symbol.symbol.toLowerCase())
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatchExchanges({
      type: ACTION_TYPE.ADD_NEW_LIST,
      payload: data.listName,
    });

    setShowAddNewList(false);
  };

  const showForm = () => setShowAddNewList(true);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatchExchanges({
      type: ACTION_TYPE.ALTER_CURRENT_LIST,
      payload: e.target.value,
    });

    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    setExchangesInfo([]);
  }, [exchanges.currentList]);

  return (
    <S.Wrapper>
      <S.WrapperOfListUser>
        <S.WrapperNewList>
          <label htmlFor="listOfExchanges">Select a list:</label>
          <S.SelectList
            id="listOfExchanges"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            {Object.keys(exchanges.lists).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </S.SelectList>
          <S.ButtonAddList onClick={showForm}>+</S.ButtonAddList>
        </S.WrapperNewList>
        {showAddNewList && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.WrapperNewList>
              <S.Field {...register("listName")} />
              <S.Button value="Add" />
            </S.WrapperNewList>
          </form>
        )}
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
