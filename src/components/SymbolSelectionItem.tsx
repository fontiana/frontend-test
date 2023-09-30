import { Checkbox } from "@/components/ui/checkbox";
import { Symbol } from "@/context/SymbolContext";

interface SymbolSelectionItemProps {
  symbol: Symbol;
  onCheck?: (symbol: Symbol) => void;
}

export default function SymbolSelectionItem({
  symbol,
  onCheck,
}: SymbolSelectionItemProps) {
  const handleChange = () => {
    onCheck?.(symbol);
  };

  return (
    <div className="flex items-center gap-2 py-1">
      <Checkbox
        id={symbol.name}
        checked={symbol.checked}
        className="rounded bg-gray-900 text-gray-400"
        onCheckedChange={handleChange}
      />
      <label htmlFor={symbol.name} className="text-gray-300 text-sm">
        {symbol.name}
      </label>
    </div>
  );
}
