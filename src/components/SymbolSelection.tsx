import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Symbol, useSymbols } from "@/context/SymbolContext";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import SymbolSelectionItem from "./SymbolSelectionItem";

export default function SymbolSelection() {
  const { symbols, handleSelectSymbol } = useSymbols();

  return (
    <div className="flex flex-col bg-gray-800 rounded p-2 gap-2 justify-between">
      <Input
        placeholder="Search for Symbols"
        className="w-[200px] rounded bg-gray-900 text-gray-400 border border-gray-500 "
      />

      <div className="flex flex-col overflow-auto h-[190px]">
        {symbols.map((symbol) => (
          <SymbolSelectionItem
            key={symbol.name}
            symbol={symbol}
            onCheck={handleSelectSymbol}
          />
        ))}
      </div>

      <Button className="border border-teal-500 text-teal-500 rounded  hover:bg-teal-800 ">
        Add to List
      </Button>
    </div>
  );
}
