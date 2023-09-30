import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import StickyHeadTable, {
  Column,
  Data,
} from "../../components/Table/TableGrid";
import * as S from "./Dashboard.styles";
import { useMemo, useState } from "react";

export interface Price {
  s: string;
  c: number;
  p: number;
  b: number;
  a: number;
}

export const Dashboard = () => {
  const [symbolsState, setSymbolsState] = useState([]);
  // const [price, setPrice] = useState<Price>();
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

  const symbols = data?.symbols;

  const handleSymbolRowClick = (symbolName: string) => {
    const selectedSymbolObject = symbols?.filter(
      (item: { symbol: string }) => item.symbol === symbolName
    );
    console.log(selectedSymbolObject, "mostre-me o símbolo");
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
        }}
      >
        <Loading />
      </div>
    );
  }

  if (error) {
    return `Ocorreu um erro ao buscar os dados da exchange: ${error}.`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log(data);

  const columns: Column[] = [
    { id: "symbol", label: "Symbol" },
    { id: "bid_price", label: "Bid Price" },
    { id: "last_price", label: "Last Price" },
    { id: "ask_price", label: "Ask Price" },
    { id: "price_change", label: "Price Change" },
  ];

  const columns1 = [{ id: "symbol", label: "Symbol" }];

  function createData(
    ask_price: number,
    bid_price: number,
    last_price: number,
    price_change: number,
    symbol: string
  ): Data {
    return { ask_price, bid_price, last_price, price_change, symbol };
  }

  const rows = [
    createData(0.000023, 0.000025, 0.000029, 250, "ETHKPI"),
    createData(0.000024, 0.000026, 0.00003, 260, "BTCROI"),
    createData(0.000025, 0.000027, 0.000031, 270, "LTCMKT"),
    createData(0.000026, 0.000028, 0.000032, 280, "XRPTRA"),
  ];

  console.log(symbolsState, "esse mano tá aqui");
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

      <StickyHeadTable columns={columns} rows={rows} />
    </S.Wrapper>
  );
};
