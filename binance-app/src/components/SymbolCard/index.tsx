import classNames from 'classnames';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from '@phosphor-icons/react';

interface SymbolCardProps {
  type?: 'header' | 'default';
}

export function SymbolCard({ type = 'default' }: SymbolCardProps) {
  return (
    <div
      className={classNames('p-4 flex items-center gap-8', {
        'bg-gray-200': type === 'header',
      })}
    >
      <Checkbox.Root className="w-5 h-5 bg-white border border-gray-400 rounded">
        <Checkbox.Indicator className="w-5 h-5 rounded flex items-center justify-center bg-teal-500">
          <Check weight="bold" className="w-4 h-4 text-white" />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <span
        className={classNames('text-lg', {
          'font-bold': type === 'header',
        })}
      >
        Symbol
      </span>
    </div>
  );
}
