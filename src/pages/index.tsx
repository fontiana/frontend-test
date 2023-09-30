import SymbolLists from "@/components/SymbolLists";
import SymbolSelection from "@/components/SymbolSelection";

export default function Home() {
  return (
    <div className="flex relative gap-4">
      <SymbolSelection />
      <SymbolLists />
    </div>
  );
}
