import { useContext } from 'react';
import { SymbolCard } from '../SymbolCard';
import { SymbolContext } from '@/contexts/SymbolContext';

interface SymbolCollectionProps {
  symbols: { symbol: string }[];
}

export function SymbolCollection({ symbols }: SymbolCollectionProps) {
  const { symbolsQuery } = useContext(SymbolContext);
  const { isLoading } = symbolsQuery;

  return (
    <div className="border border-gray-200 overflow-y-auto">
      <SymbolCard type="header" />

      {isLoading
        ? [...Array(10)].map((_, index) => <SymbolCard key={index} type="skeleton" />)
        : symbols.map(({ symbol }) => (
            <SymbolCard key={symbol} symbol={symbol} />
          ))}
    </div>
  );
}
