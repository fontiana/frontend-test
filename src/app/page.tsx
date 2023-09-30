import GroupList from "@/components/groupList";
import PriceTable from "@/components/symbolsData";
import SymbolsList from "@/components/symbolsList";

export default function Home() {
  return (
    <main className="flex flex-col gap-2 m-2">
      <GroupList />
      <SymbolsList />
      <PriceTable />
    </main>
  );
}
