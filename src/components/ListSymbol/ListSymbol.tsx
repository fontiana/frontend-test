import React, { useEffect, useState } from "react";
import { CheckboxLabel, StyledForm, SearchInput, SubmitButton } from "./styles";
import { getExchangeInfo } from "../../services/services";
import { useSymbolContext } from "../../context/context";

const ListSymbol: React.FC = () => {
  const { symbolContext, setSymbolContext, setSymbolsList } =
    useSymbolContext();
  const [symbols, setSymbols] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSymbolData = async () => {
    try {
      const response = await getExchangeInfo();
      if (response && response.data) {
        setSymbols(response.data.symbols);
      }
    } catch (error) {
      throw new Error("Error while fetching symbol data");
    }
  };

  const handleCheckboxChange = (symbol: any) => {
    const isSymbolSelected = symbolContext.some(
      (selectedSymbol) => selectedSymbol.symbol === symbol.symbol
    );

    if (isSymbolSelected) {
      setSymbolContext(
        symbolContext.filter(
          (selectedSymbol) => selectedSymbol.symbol !== symbol.symbol
        )
      );
    } else {
      setSymbolContext([...symbolContext, symbol]);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const createSymbolsList = () => {
    const selectedSymbols = symbols.filter((symbol) => {
      return symbolContext.some(
        (selectedSymbol) => selectedSymbol.symbol === symbol.symbol
      );
    });

    if (selectedSymbols.length > 0) {
      setSymbolsList([...symbolContext, ...selectedSymbols]);
    }
  };

  useEffect(() => {
    fetchSymbolData();
  }, []);

  return (
    <>
      <StyledForm>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
      </StyledForm>

      {symbols
        .filter((symbol) =>
          symbol.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 15)
        .map((symbol) => (
          <CheckboxLabel key={symbol.symbol}>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(symbol)}
            />
            {symbol.symbol}
          </CheckboxLabel>
        ))}
      <SubmitButton onClick={() => createSymbolsList()} type="submit">
        Add to list
      </SubmitButton>
    </>
  );
};

export default ListSymbol;
