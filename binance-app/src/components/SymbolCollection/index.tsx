import { Symbol, SymbolContext } from '@/contexts/SymbolContext';
import { Check } from '@phosphor-icons/react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useContext } from 'react';
import { SymbolCard } from '../SymbolCard';

interface SymbolCollectionProps {
  symbols: Symbol[];
}

export function SymbolCollection({ symbols }: SymbolCollectionProps) {
  const { checkAllSymbols, allChecked, checkSymbol } =
    useContext(SymbolContext);

  return (
    <div className="border border-gray-200 overflow-y-auto">
      <header className={'bg-gray-200 p-4 flex items-center gap-8 h-[3.75rem]'}>
        <Checkbox.Root
          checked={allChecked}
          onCheckedChange={checkAllSymbols}
          className="w-5 h-5 bg-white border border-gray-400 rounded"
        >
          <Checkbox.Indicator className="w-5 h-5 rounded flex items-center justify-center bg-teal-500">
            <Check weight="bold" className="w-4 h-4 text-white" />
          </Checkbox.Indicator>
        </Checkbox.Root>

        <span className="text-lg font-bold">Symbol</span>
      </header>

      {symbols.map((symbol) => (
        <SymbolCard
          key={symbol.name}
          symbol={symbol}
          onCheck={() => checkSymbol(symbol.name)}
        />
      ))}
    </div>
  );
}
