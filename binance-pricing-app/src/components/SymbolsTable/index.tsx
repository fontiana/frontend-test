import React from 'react';
import SymbolDetails from '../SymbolDetails';

interface SymbolsTableProps {
  selectedSymbol: string | null;
}

const SymbolsTable: React.FC<SymbolsTableProps> = ({ selectedSymbol }) => {
  return (
    <div>
      {selectedSymbol ? <SymbolDetails symbol={selectedSymbol} /> : <p>Select a symbol from the list</p>}
    </div>
  );
};

export default SymbolsTable;
