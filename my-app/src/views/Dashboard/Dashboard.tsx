/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "react-query";
import { Loading } from "../../components/Loading";
import StickyHeadTable, { Column } from "../../components/Table/TableGrid";
import * as S from "./Dashboard.styles";
import { useContext, useEffect, useMemo, useState } from "react";
import { BidContext } from "../../services/context";

export const Dashboard = () => {
  const [symbolsState, setSymbolsState] = useState([]);
  const [symbol, setSymbol] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { setBidData, bidData } = useContext(BidContext);

  const { data, error, isLoading } = useQuery("exchangeInfo", async () => {
    const response = await fetch(
      "https://data.binance.com/api/v3/exchangeInfo"
    );
    if (!response.ok) {
      throw new Error("Não foi possível obter os dados da exchange.");
    }

    //Lidar com erro 302 presente no momento
    if (response.status === 302) {
      const response = await fetch("https://www.binance.com/en");
      const jsonData = await response.json();
      return jsonData;
    }
    const jsonData = await response.json();
    return jsonData;
  });

  useEffect(() => {
    const ws = new WebSocket(
      `wss:data-stream.binance.com/stream?streams=${
        symbol
          .map((symbolItem) => symbolItem)
          .join("@ticker/")
          .toLowerCase() + "@ticker"
      }`
    );

    ws.onmessage = (event) => {
      if (event.data) {
        setBidData((prev) => {
          if (!prev) {
            return [JSON.parse(event.data)];
          }
          const index = prev.findIndex(
            (item) => item.data.s === JSON.parse(event.data).data.s
          );
          if (index >= 0) {
            prev[index].data.c = JSON.parse(event.data).data.c;
            return prev;
          }
          return prev.concat(JSON.parse(event.data));
        });
      }
      setLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol]);

  const symbols = data?.symbols;

  const handleSymbolRowClick = (symbolName: string) => {
    setLoading(true);
    const selectedSymbolObject = symbols?.filter(
      (item: { symbol: string }) => item.symbol === symbolName
    );
    setSymbol((prev) => [...prev, selectedSymbolObject[0].symbol]);
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
      <S.Section>
        <S.SubTitle> INFORMATIONS </S.SubTitle>
        {loading ? (
          <Loading />
        ) : (
          <StickyHeadTable
            columns={columns}
            tableWidth="100%"
            rows={
              bidData?.map((item) => ({
                symbol: item.data.s,
                last_price: item.data.P,
                ask_price: item.data.a,
                bid_price: item.data.b,
                price_change: item.data.P,
              })) || []
            }
          />
        )}
      </S.Section>
    </S.Wrapper>
  );
};
