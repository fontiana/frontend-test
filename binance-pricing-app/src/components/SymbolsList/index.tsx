import React, { useState } from 'react';
import {
  SymbolsListContainer,
  SymbolsListTitle,
  SymbolsListContent,
  SymbolItem,
  SymbolItemText,
  SymbolInput,
} from './style.ts';

interface SymbolsListProps {
  symbols: string[];
}

export const SymbolsList: React.FC<SymbolsListProps> = ({ symbols }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const displayedSymbols = symbols.filter(symbol =>
    symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);

  return (
    <SymbolsListContainer>
      <SymbolInput
        type="text"
        placeholder="Search symbols"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SymbolsListTitle>Symbols</SymbolsListTitle>
      <SymbolsListContent>
        { displayedSymbols.map((symbol, index) => (
          <SymbolItem key={ index }>
            <SymbolItemText>{ symbol }</SymbolItemText>
          </SymbolItem>
        )) }
      </SymbolsListContent>
    </SymbolsListContainer>
  );
}
