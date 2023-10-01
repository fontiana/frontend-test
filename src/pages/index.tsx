import SymbolLists from "@/components/SymbolLists";
import SymbolSelection from "@/components/SymbolSelection";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row md:relative gap-4">
      <SymbolSelection />
      <SymbolLists />
    </div>
  );
}
