import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSymbolsContext } from "@/context/SymbolContext";
import useSymbols from "@/lib/useSymbols";
import React, { useMemo, useState } from "react";

import SymbolSelectionItem from "./SymbolSelectionItem";

export default function SymbolSelection() {
  const { symbols, handleSelectSymbol, unselectAll } = useSymbols();
  const { addSymbolsToList } = useSymbolsContext();

  const [searchText, setSearchText] = useState("");

  const selectedSymbols = useMemo(() => {
    return symbols.filter((symbol) => symbol.checked);
  }, [symbols]);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredSymbols = useMemo(() => {
    return symbols.filter((symbol) =>
      symbol.name.toLocaleLowerCase().includes(searchText)
    );
  }, [searchText, symbols]);

  const handleAddToList = () => {
    addSymbolsToList(selectedSymbols.map((symbol) => symbol.name));
    unselectAll();
  };

  return (
    <div className="flex flex-col bg-gray-800 md:w-[215px] rounded p-2 gap-2 justify-between">
      <Input
        value={searchText}
        onChange={handleChangeSearch}
        placeholder="Search for Symbols"
        className="md:w-[200px] rounded bg-gray-900 text-gray-400 border border-gray-500 "
      />

      <div className="flex flex-col overflow-auto h-[190px]">
        {filteredSymbols.map((symbol: any) => (
          <SymbolSelectionItem
            key={symbol.name}
            symbol={symbol}
            onCheck={handleSelectSymbol}
          />
        ))}
      </div>

      <Button
        onClick={handleAddToList}
        className="border border-teal-500 text-teal-500 rounded  hover:bg-teal-800 "
      >
        Add to List
      </Button>
    </div>
  );
}
