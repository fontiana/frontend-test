import { ChangeEvent, useEffect, useState } from "react";
import * as S from "./styles";
import { getSymbols } from "../../../../api/binance";
import { useExchangeInfo } from "../../context/useExchangeInfo";

interface SymbolI {
  symbol: string;
  checked: boolean;
}

const Symbols = () => {
  const [symbols, setSymbols] = useState([] as SymbolI[]);
  const [isChecked, setIsChecked] = useState(false);
  const { setExchange } = useExchangeInfo();

  useEffect(() => {
    const fetchSymbols = async () => {
      const symbols = await getSymbols();
      setSymbols(symbols.symbols);
    };

    fetchSymbols();
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

  return (
    <S.Wrapper>
      <S.Search type="search" placeholder="Procurar..." />
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
        {symbols.slice(0, 10).map((symbol, i) => {
          return (
            <li key={symbol.symbol}>
              <S.CoinSymbol isChecked={symbol?.checked} htmlFor={symbol.symbol}>
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
    </S.Wrapper>
  );
};

export default Symbols;
