import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';

import { SymbolsList } from "../SymbolsList";
import { MainContainer } from './style.ts';
import useSymbols from "../../hooks/useSymbols.ts";
import { setSymbols } from '../../redux/symbolsSlice.ts';
import SymbolsTable from "../SymbolsTable/index.tsx";

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const { symbols, loading } = useSymbols();
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  useEffect(() => {
    dispatch(setSymbols(symbols));
  }, [dispatch, symbols]);

  const handleSymbolSelection = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  return (
    <MainContainer>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <SymbolsList symbols={symbols} onSymbolSelect={handleSymbolSelection} />
          <SymbolsTable selectedSymbol={selectedSymbol} />
        </>
      )}
    </MainContainer>
  );
};