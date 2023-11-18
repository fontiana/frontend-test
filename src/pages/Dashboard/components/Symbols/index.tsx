import { ChangeEvent, useEffect, useState, KeyboardEvent } from "react";
import * as S from "./styles";
import { getSymbols } from "../../../../api/binance";
import { useExchangeInfo } from "../../context/useExchangeInfo";
import { isAxiosError } from "axios";
import ErrorComponent from "../../../../components/Error";
import { ACTION_TYPE } from "../../context/useExchangeInfo/actions";
import { useForm } from "react-hook-form";
import { PAGES } from "../../../../utils/pages";

type TSymbol = string[];

const Symbols = () => {
  const [symbols, setSymbols] = useState<TSymbol>([]);
  const [symbolsFiltered, setSymbolsFiltered] = useState<TSymbol>([]);

  const { register, handleSubmit, control, setValue, getValues } = useForm();
  const { exchanges, dispatchExchanges } = useExchangeInfo();

  const fetchSymbols = async () => {
    const symbols = await getSymbols();
    const symbolsName = symbols.map((coins: any) => coins.symbol);
    setSymbols(symbolsName);
  };

  useEffect(() => {
    fetchSymbols();

    return () => {
      setSymbols([]);
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
        symbol.includes((e.target as HTMLInputElement).value.toUpperCase())
      );

      setSymbolsFiltered(symbolsFiltered);
    }
  };

  const onSubmit = (data: object) => {
    if (!exchanges.currentList) {
      alert("Please select a list");
    } else {
      const listSymbols = Object.entries(data)
        .filter(([key, value]) => value === true && key !== "selectAll")
        .map(([key]) => key);

      dispatchExchanges({
        type: ACTION_TYPE.ADD_TO_LIST,
        payload: listSymbols,
      });
    }
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
            <S.CoinSymbolHeader htmlFor="selectAll">
              <S.Checkbox
                data-testid={`${PAGES.DASHBOARD}__input-checkbox--symbol`}
                {...register("selectAll")}
                onChange={handleAllCheckboxChange}
              />
              Symbol
            </S.CoinSymbolHeader>
          </li>

          {(symbolsFiltered.length > 0 ? symbolsFiltered : symbols)
            ?.slice(0, 10)
            .map((symbol) => {
              return (
                <li key={symbol}>
                  <S.CoinSymbol htmlFor={symbol}>
                    <S.Checkbox id={symbol} {...register(symbol)} />
                    {symbol}
                  </S.CoinSymbol>
                </li>
              );
            })}
        </ul>
        <S.Button value="Add to List" />
      </form>
    </S.Wrapper>
  );
};

export default Symbols;
