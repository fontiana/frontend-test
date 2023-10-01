/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "react-query";
import { Loading } from "../../components/Loading";
import StickyHeadTable, { Column } from "../../components/Table/TableGrid";
import * as S from "./Dashboard.styles";
import { useMemo, useState } from "react";

interface ITicker {
  stream: string;
  data: {
    c: string;
    b: string;
    a: string;
    P: string;
    s: string;
  };
}

export const Dashboard = () => {
  const [symbolsState, setSymbolsState] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [bidData, setBidData] = useState<ITicker>();

  const { data, error, isLoading } = useQuery("exchangeInfo", async () => {
    const response = await fetch(
      "https://data.binance.com/api/v3/exchangeInfo"
    );
    if (!response.ok) {
      throw new Error("Não foi possível obter os dados da exchange.");
    }
    const jsonData = await response.json();
    return jsonData;
  });

  const ws = new WebSocket(
    `wss:data-stream.binance.com/stream?streams=${symbol.toLowerCase()}@ticker`
  );

  ws.onmessage = (event) => {
    console.log(event.data);
    !!event.data && setBidData(event.data);
  };

  console.log(bidData, "aqui");

  const symbols = data?.symbols;

  const handleSymbolRowClick = (symbolName: string) => {
    const selectedSymbolObject = symbols?.filter(
      (item: { symbol: string }) => item.symbol === symbolName
    );
    setSymbol(selectedSymbolObject[0].symbol);
  };

  useMemo(() => {
    setSymbolsState(symbols);
  }, [symbols]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "50px",
          height: "100%",
        }}
      >
        <Loading />
      </div>
    );
  }

  if (error) {
    return `Ocorreu um erro ao buscar os dados da exchange: ${error}.`;
  }

  const columns: Column[] = [
    { id: "symbol", label: "Symbol" },
    { id: "bid_price", label: "Bid Price" },
    { id: "last_price", label: "Last Price" },
    { id: "ask_price", label: "Ask Price" },
    { id: "price_change", label: "Price Change" },
  ];

  const columns1 = [{ id: "symbol", label: "Symbol" }];

  return (
    <S.Wrapper>
      <div style={{ marginRight: "20px" }}>
        <div style={{ marginBottom: "12px" }}>
          <S.Input
            placeholder="Search for a symbol..."
            onChange={(e) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setSymbolsState(() => {
                if (isLoading) return "carregando";
                if (!e.target.value) return symbols;

                return symbols.filter((item: { symbol: string }) =>
                  item.symbol
                    .toLocaleLowerCase()
                    .includes(e.target.value.toLocaleLowerCase())
                );
              });
            }}
          />
        </div>
        <StickyHeadTable
          rowsQntyPerPage={3000}
          noPagination
          tableWidth="350px"
          columns={columns1 as Column[]}
          rows={symbolsState}
          onClickRow={(rowId) => handleSymbolRowClick(rowId)}
        />
      </div>

      <StickyHeadTable
        columns={columns}
        rows={
          (bidData && [
            {
              last_price: bidData.data.P,
              ask_price: bidData.data.a,
              bid_price: bidData.data.b,
              price_change: bidData.data.P,
              symbol: bidData.data.s,
            },
          ]) ||
          []
        }
      />
    </S.Wrapper>
  );
};
