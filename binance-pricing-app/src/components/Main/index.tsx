import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';

import { SymbolsList } from "../SymbolsList";
import { MainContainer } from './style.ts';
import useSymbols from "../../hooks/useSymbols.ts";
import { setSymbols } from '../../redux/symbolsSlice.ts';

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const { symbols, loading } = useSymbols();

  useEffect(() => {
    // Atualizar o estado do Redux com os dados obtidos do hook
    dispatch(setSymbols(symbols));
  }, [dispatch, symbols]);

  return (
    <MainContainer>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <SymbolsList symbols={symbols} />
        </>
      )}
    </MainContainer>
  );
};