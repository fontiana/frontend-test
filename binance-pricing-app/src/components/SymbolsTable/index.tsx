import React from 'react';

import SymbolDetails from '../SymbolDetails';
import {
  SymbolsTableContainer,
  SymbolsTableText,
} from './style.ts';

interface SymbolsTableProps {
  selectedSymbol: string | null;
}

const SymbolsTable: React.FC<SymbolsTableProps> = ({ selectedSymbol }) => {
  return (
    <SymbolsTableContainer>
      {selectedSymbol ? <SymbolDetails symbol={selectedSymbol} /> : <SymbolsTableText>Select a symbol from the list</SymbolsTableText>}
    </SymbolsTableContainer>
  );
};

export default SymbolsTable;
