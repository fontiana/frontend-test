import { X } from "lucide-react";
import { useState } from "react";

import Modal from "react-modal";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSymbolsContext } from "@/context/SymbolContext";
import SymbolTable from "./SymbolTable";

export default function SymbolLists() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createSymbolList, symbolLists, selectedList, selectList } =
    useSymbolsContext();
  const [newListName, setNewListName] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
    setNewListName("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateList = () => {
    if (newListName) {
      createSymbolList(newListName);
      closeModal();
    }
  };

  return (
    <div className="flex flex-col bg-gray-800 border border-gray-600 w-[600px] rounded p-2 ">
      <div className="flex gap-2">
        <Select onValueChange={selectList} value={selectedList.name}>
          <SelectTrigger className="w-[550px] rounded bg-gray-900 text-gray-400 border border-gray-500 cursor-pointer">
            <SelectValue placeholder="Lists" />
          </SelectTrigger>
          <SelectContent className="w-[550px] rounded bg-gray-900 text-gray-300">
            {symbolLists.map((list) => (
              <SelectItem
                key={list.name}
                value={list.name}
                className="cursor-pointer"
              >
                {list.name}
              </SelectItem>
            ))}
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
        <SymbolTable symbolList={selectedList} />

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => {
            console.log("closing");
            closeModal();
          }}
          className="margin-x-auto"
          overlayClassName="fixed inset-0 backdrop-blur-md flex justify-center items-center"
          ariaHideApp={false}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
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
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
            </div>
            <div className="flex mt-4">
              <Button
                onClick={handleCreateList}
                className="text-gray-100 bg-teal-500 hover:bg-teal-800 w-[100vw] rounded"
              >
                Create
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
