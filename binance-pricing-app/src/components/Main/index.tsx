import React from "react";

import { SymbolsList } from "../SymbolsList";
import { MainContainer } from './style.ts';
import useSymbols from "../../hooks/useSymbols.ts";

export const Main = () => {
  const { symbols, loading } = useSymbols();
  return (
    <MainContainer>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <SymbolsList symbols={ symbols } />
        </>
      )}
    </MainContainer>
  );
};