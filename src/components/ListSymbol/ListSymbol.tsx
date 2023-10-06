import React, { useEffect, useState } from "react";
import { CheckboxLabel, StyledForm, SearchInput, SubmitButton } from "./styles";
import { getExchangeInfo } from "../../services/exchangeInfo";
import { useSymbolContext } from "../../context/context";

const ListSymbol: React.FC = () => {
  const { setSymbolsList, symbolsList } = useSymbolContext();
  const [symbols, setSymbols] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSymbols, setSelectedSymbols] = useState<any[]>([]);
  const [listNumber, setListNumber] = useState<number>(1);

  const fetchSymbolData = async () => {
    try {
      const response = await getExchangeInfo();
      if (response?.data) {
        setSymbols(response.data.symbols);
      }
    } catch (error) {
      throw new Error("Error while fetching symbol data");
    }
  };

  const handleCheckboxChange = (symbol: any) => {
    const isSymbolSelected = selectedSymbols.includes(symbol.symbol);

    if (isSymbolSelected) {
      setSelectedSymbols((s) =>
        s.filter((selectedSymbol) => selectedSymbol.symbol !== symbol.symbol)
      );
    } else {
      setSelectedSymbols((symbolsChecked) => [...symbolsChecked, symbol]);
    }
  };

  const createSymbolsList = () => {
    const newList = { [`List ${listNumber}`]: selectedSymbols };
    setSelectedSymbols([]);
    setListNumber(listNumber + 1);
    setSymbolsList([...symbolsList, newList]);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
              checked={selectedSymbols.some((s) => s.symbol === symbol.symbol)}
              onChange={() => handleCheckboxChange(symbol)}
            />
            {symbol.symbol}
          </CheckboxLabel>
        ))}
      <SubmitButton onClick={createSymbolsList} type="submit">
        Add to list
      </SubmitButton>
    </>
  );
};

export default ListSymbol;