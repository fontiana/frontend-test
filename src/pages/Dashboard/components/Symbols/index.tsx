import {
  ChangeEvent,
  useEffect,
  useState,
  KeyboardEvent,
  Suspense,
} from "react";
import * as S from "./styles";
import { getSymbols } from "../../../../api/binance";
import { useExchangeInfo } from "../../context/useExchangeInfo";
import Spinner from "../../../../components/Spinner";
import { isAxiosError } from "axios";
import ErrorComponent from "../../../../components/Error";
import { ACTION_TYPE } from "../../context/useExchangeInfo/actions";
import { useForm } from "react-hook-form";

interface SymbolI {
  symbol: string;
  checked: boolean;
  // TODO: increase more details about object Symbol
  // Need defined rule to show symbols list
}

const Symbols = () => {
  const [symbols, setSymbols] = useState([] as SymbolI[]);
  const [symbolsFiltered, setSymbolsFiltered] = useState([] as SymbolI[]);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, control, setValue, getValues } = useForm();
  const { exchanges, dispatchExchanges } = useExchangeInfo();

  const fetchSymbols = async () => {
    const symbols = await getSymbols();
    setSymbols(symbols);
  };

  useEffect(() => {
    fetchSymbols();

    setLoading(false);

    return () => {
      setSymbols([]);
      setLoading(true);
    };
  }, []);

  const handleAllCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const allFields = Object.keys(control._fields);

    const inputSelectAll = getValues("selectAll");

    allFields.forEach((field) => {
      setValue(field, !inputSelectAll);
    });
  };

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const symbolsFiltered = symbols.filter((symbol) =>
        symbol.symbol.includes(
          (e.target as HTMLInputElement).value.toUpperCase()
        )
      );

      setSymbolsFiltered(symbolsFiltered);
    }
  };

  const onSubmit = (data: object) => {
    if (exchanges.currentList === "") {
      alert("Please select a list");
    }

    const listSymbols = Object.entries(data)
      .filter(([_, value]) => value === true)
      .map(([key]) => key);

    dispatchExchanges({
      type: ACTION_TYPE.ADD_TO_LIST,
      payload: listSymbols,
    });
  };

  if (isAxiosError(symbols)) {
    return (
      <S.Wrapper>
        <ErrorComponent
          message="The symbols could not be found"
          onRetry={fetchSymbols}
        />
      </S.Wrapper>
    );
  }

  if (loading) {
    return (
      <S.Wrapper>
        <Spinner message="Loading symbols..." />
      </S.Wrapper>
    );
  }

  console.log("re-rendering");

  return (
    <S.Wrapper>
      <S.Search
        type="search"
        placeholder="Search..."
        onKeyDown={handleSearch}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          <li>
            <S.CoinSymbolHeader htmlFor="Symbol">
              <S.Checkbox
                {...register("selectAll")}
                onChange={handleAllCheckboxChange}
              />
              Symbol
            </S.CoinSymbolHeader>
          </li>
          <Suspense fallback={<Spinner />}>
            {(symbolsFiltered.length > 0 ? symbolsFiltered : symbols)
              ?.slice(0, 10)
              .map((symbol, i) => {
                return (
                  <li key={symbol.symbol}>
                    <S.CoinSymbol htmlFor={symbol.symbol}>
                      <S.Checkbox
                        id={symbol.symbol}
                        {...register(symbol.symbol)}
                      />
                      {symbol.symbol}
                    </S.CoinSymbol>
                  </li>
                );
              })}
          </Suspense>
        </ul>
        <S.Button value="Add to List" />
      </form>
    </S.Wrapper>
  );
};

export default Symbols;
