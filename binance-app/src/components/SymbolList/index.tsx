import { SymbolCard } from '@/components/SymbolCard';
import { MagnifyingGlass } from '@phosphor-icons/react';

export function SymbolList() {
  return (
    <aside className="flex flex-col justify-between max-w-sm px-2 py-8 shadow-xl h-full">
      <header className="space-y-3">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-200 rounded px-3 py-2 w-full"
          />
          <MagnifyingGlass
            weight="bold"
            size={22}
            className="text-gray-400 absolute top-2.5 right-3.5 group-focus-within:invisible"
          />
        </div>

        <div className="border border-gray-200">
          <SymbolCard type="header" />
          <SymbolCard />
          <SymbolCard />
          <SymbolCard />
          <SymbolCard />
        </div>
      </header>

      <button className="text-xl text-white bg-teal-500 text-center w-full rounded py-3 hover:bg-teal-600 transition-colors">
        Add to List
      </button>
    </aside>
  );
}
