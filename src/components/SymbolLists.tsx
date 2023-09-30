import { useContext, useState } from "react";
import { X } from "lucide-react";

import Modal from "react-modal";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSymbols } from "@/context/SymbolContext";

export default function SymbolLists() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedSymbols } = useSymbols();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col bg-gray-800 border border-gray-600 w-[600px] rounded p-2 ">
      <div className="flex gap-2">
        <Select>
          <SelectTrigger className="w-[550px] rounded bg-gray-900 text-gray-400 border border-gray-500 cursor-pointer">
            <SelectValue placeholder="Lists" />
          </SelectTrigger>
          <SelectContent className="w-[550px] rounded bg-gray-900 text-gray-300">
            <SelectItem value="list 1" className="cursor-pointer">
              List 1
            </SelectItem>
            <SelectItem value="list 2" className="cursor-pointer">
              List 2
            </SelectItem>
            <SelectItem value="list 3" className="cursor-pointer">
              List 3
            </SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={openModal}
          className="border border-teal-500 text-teal-500 w-[50px] rounded hover:bg-teal-800"
        >
          +
        </Button>
      </div>

      <div>
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
            {selectedSymbols.map((symbol) => (
              <TableRow
                key={symbol.name}
                className="bg-gray-500 my-2 border border-gray-800 rounded border-2 text-gray-300"
              >
                <TableCell>{symbol.name}</TableCell>
                <TableCell>0.0025</TableCell>
                <TableCell>0.0024</TableCell>
                <TableCell>0.0026</TableCell>
                <TableCell>
                  <span className="text-teal-500 bg-teal-800 rounded-[0.5rem] p-1">
                    250%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0 backdrop-blur-md"
        >
          <div className="bg-gray-800 w-[400px] h-[250px] gap-2 flex flex-col  justify-start rounded p-8 relative text-gray-300 border border-gray-400 border-2">
            <header className="flex justify-between">
              <h1 className="text-gray-100 font-bold">Create a New List</h1>
              <span
                className="text-gray-100 cursor-pointer"
                onClick={closeModal}
              >
                <X />
              </span>
            </header>
            <div>
              <Label>Name</Label>
              <Input
                placeholder="example: List 1"
                className="rounded bg-gray-900 text-gray-500"
              />
            </div>
            <div className="flex mt-4">
              <Button className="text-gray-100 bg-teal-500 hover:bg-teal-800 w-[100vw] rounded">
                Create
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
