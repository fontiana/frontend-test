import { SymbolContext } from '@/contexts/SymbolContext';
import { MagnifyingGlass } from '@phosphor-icons/react';
import classNames from 'classnames';
import { useContext, useMemo, useState } from 'react';
import { SymbolCollection } from '../SymbolCollection';

export function SymbolList() {
  const [search, setSearch] = useState('');

  const { symbols, symbolsQuery, addSymbolsToWatchList, resetAllCheck } =
    useContext(SymbolContext);
  const { isLoading } = symbolsQuery;

  const filteredData = useMemo(
    () =>
      !search
        ? symbols
        : symbols.filter(({ name }) =>
            name.toLowerCase().includes(search.toLowerCase())
          ),
    [symbols, search]
  );

  function handleAddSelectedSymbolsToWatchList() {
    const selectedSymbols = symbols
      .filter(({ checked }) => checked)
      .map(({ name }) => name);

    addSymbolsToWatchList(selectedSymbols);

    resetAllCheck();
  }

  return (
    <aside className="hidden border border-gray-200 rounded-lg sm:flex flex-col gap-3 max-w-sm w-full px-2 py-8 shadow-xl bg-white">
      <div className="relative group">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-200 rounded px-3 py-2 w-full"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
        <MagnifyingGlass
          weight="bold"
          size={22}
          className="text-gray-400 absolute top-2.5 right-3.5 group-focus-within:invisible"
        />
      </div>

      <SymbolCollection symbols={filteredData} />

      <button
        disabled={isLoading}
        onClick={handleAddSelectedSymbolsToWatchList}
        className={classNames(
          'mt-auto text-base sm:text-xl text-white text-center w-full rounded py-3 transition-colors',
          {
            'cursor-not-allowed bg-teal-600': isLoading,
            'bg-teal-500 hover:bg-teal-600': !isLoading,
          }
        )}
      >
        Add to List
      </button>
    </aside>
  );
}
