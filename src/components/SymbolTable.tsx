import { SymbolList } from "@/context/SymbolContext";
import useRealtimeSymbols from "@/lib/useRealtimeSymbols";
import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";

export default function SymbolTable({
  symbolList,
}: {
  symbolList: SymbolList;
}) {
  const { realtimeSymbols } = useRealtimeSymbols(symbolList.symbols);

  return (
    <Table>
      <TableHeader>
        <TableRow className="my-3 border border-gray-800 text-gray-300">
          <TableHead className="w-[35px]">Symbol</TableHead>
          <TableHead className="w-[35px]">Last Price</TableHead>
          <TableHead className="w-[35px]">Bid Price</TableHead>
          <TableHead className="w-[35px]">Ask Price</TableHead>
          <TableHead className="w-[100px]">Prince Change</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {realtimeSymbols.map((symbol) => (
          <TableRow
            key={symbol.name}
            className="bg-gray-500 my-2 border border-gray-800 rounded border-2 text-gray-300"
          >
            <TableCell>{symbol.name}</TableCell>
            <TableCell>{symbol.lastPrice}</TableCell>
            <TableCell>{symbol.bidPrice}</TableCell>
            <TableCell>{symbol.askPrice}</TableCell>
            <TableCell>
              <span className="text-teal-500 bg-teal-800 rounded-[0.5rem] p-1">
                {symbol.priceChangePercent}%
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
