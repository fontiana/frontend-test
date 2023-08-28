import { Symbol } from '@/contexts/SymbolContext';
import { Check } from '@phosphor-icons/react';
import * as Checkbox from '@radix-ui/react-checkbox';

interface SymbolCardProps {
  symbol: Symbol;
  onCheck: () => void;
}

export function SymbolCard({ symbol, onCheck }: SymbolCardProps) {
  return (
    <div className={'p-4 flex items-center gap-8 h-[3.75rem]'}>
      <Checkbox.Root
        checked={symbol.checked}
        onCheckedChange={onCheck}
        className="w-5 h-5 bg-white border border-gray-400 rounded"
      >
        <Checkbox.Indicator className="w-5 h-5 rounded flex items-center justify-center bg-teal-500">
          <Check weight="bold" className="w-4 h-4 text-white" />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <span className="text-lg">{symbol.name}</span>
    </div>
  );
}
