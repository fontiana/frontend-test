import { ChangeEvent, useEffect, useState, KeyboardEvent } from "react";
import * as S from "./styles";
import { getSymbols } from "../../../../api/binance";
import { useExchangeInfo } from "../../context/useExchangeInfo";
import Spinner from "../../../../components/Spinner";
import { isAxiosError } from "axios";
import ErrorComponent from "../../../../components/Error";

interface SymbolI {
  symbol: string;
  checked: boolean;
  // TODO: increase more details about object Symbol
}

const Symbols = () => {
  const [symbols, setSymbols] = useState([] as SymbolI[]);
  const [symbolsFiltered, setSymbolsFiltered] = useState([] as SymbolI[]);

  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  const { setExchange } = useExchangeInfo();

  const fetchSymbols = async () => {
    const symbols = await getSymbols();
    setSymbols(symbols.symbols ?? symbols);
  };

  useEffect(() => {
    fetchSymbols();

    setLoading(false);

    return () => {
      setSymbols([]);
      setLoading(true);
      setIsChecked(false);
    };
  }, []);

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setSymbols((prevSymbols) => {
      const updatedSymbols = [...prevSymbols];
      updatedSymbols[i] = {
        ...updatedSymbols[i],
        checked: e.target.checked,
      };

      return updatedSymbols;
    });
  };

  const handleAllCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSymbols((prevSymbols) => {
      const updatedSymbols = [...prevSymbols].map((symbol) => ({
        ...symbol,
        checked: e.target.checked,
      }));

      return updatedSymbols;
    });

    setIsChecked(e.target.checked);
  };

  const handleExchange = () => {
    const listSymbols = [...symbols].filter(
      (symbol: any) => symbol.checked === true
    );

    setExchange(listSymbols);
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

  return (
    <S.Wrapper>
      <S.Search
        type="search"
        placeholder="Procurar..."
        onKeyDown={handleSearch}
      />

      <>
        <ul>
          <li>
            <S.CoinSymbolHeader htmlFor="Symbol">
              <S.Checkbox
                checked={isChecked}
                onChange={(e) => handleAllCheckboxChange(e)}
              />
              Symbol
            </S.CoinSymbolHeader>
          </li>
          {(symbolsFiltered.length > 0 ? symbolsFiltered : symbols)
            ?.slice(0, 10)
            .map((symbol, i) => {
              return (
                <li key={symbol.symbol}>
                  <S.CoinSymbol
                    isChecked={symbol?.checked}
                    htmlFor={symbol.symbol}
                  >
                    <S.Checkbox
                      id={symbol.symbol}
                      checked={symbol?.checked}
                      onChange={(e) => handleCheckboxChange(e, i)}
                    />
                    {symbol.symbol}
                  </S.CoinSymbol>
                </li>
              );
            })}
        </ul>
        <S.Button value="Adicionar a lista" onClick={handleExchange} />
      </>
    </S.Wrapper>
  );
};

export default Symbols;
