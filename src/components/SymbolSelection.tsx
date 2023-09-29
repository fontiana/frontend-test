import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Symbol } from "@/lib/types";
import SymbolSelectionItem from "./Symbol";
import { useState } from "react";

const symbolListFromContext: Array<Symbol> = [
  {
    name: "1",
    checked: false,
  },
  {
    name: "2",
    checked: false,
  },
  {
    name: "3",
    checked: false,
  },
  {
    name: "4",
    checked: false,
  },
  {
    name: "5",
    checked: false,
  },
];

export default function SymbolSelection() {
  const [symbolList, setSymbolList] = useState(symbolListFromContext);

  const handleUpdateList = (symbol: Symbol) => {
    console.log({ symbol });

    setSymbolList((prevSymbolList) => {
      return prevSymbolList.map((item) => {
        if (item.name === symbol.name) {
          return { ...symbol, checked: !symbol.checked };
        }
        return item;
      });
    });
  };

  return (
    <div className="flex flex-col bg-gray-800 rounded p-2 gap-2 justify-between">
      <Input
        placeholder="search"
        className="w-[200px] rounded bg-gray-900 text-gray-500"
      />

      <div className="flex flex-col overflow-auto h-[190px]">
        {symbolList.map((symbol) => (
          <SymbolSelectionItem
            key={symbol.name}
            symbol={symbol}
            onCheck={(item) => handleUpdateList(item)}
          />
        ))}
      </div>

      <Button className="border border-teal-500 text-teal-500 rounded  hover:bg-teal-800 ">
        Add to List
      </Button>
    </div>
  );
}
