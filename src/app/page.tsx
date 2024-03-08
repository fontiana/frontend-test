import GroupList from "@/components/groupList";
import PriceTable from "@/components/symbolsData";
import SymbolsList from "@/components/symbolsList";

export default function Home() {
  return (
    <main className="gap-4 my-4 w-full">
      <div className="container flex flex-col justify-normal items-center p-6 mx-auto lg:w-3/4">
        <div className="text-center md:3/4 lg:w-1/3 flex flex-col justify-center items-center gap-2">
          <h1 className="text-2xl font-bold">Binance</h1>
          <h2>Manage a Binance pricing update</h2>
          <h2 className="text-lg font-bold">How?</h2>
          <h3>
            Add a new list by typing a name on list field, add some symbols to
            your list and done! A table will be filled with the data you need to
            know and the data will be updated in real-time!
          </h3>
        </div>
        <div className="text-left w-1/3 hidden">
          <h2 className="text-lg font-bold">Steps:</h2>
          <ul className="list-item ml-4">
            <li>1. Create a list</li>
            <li>2. Set a list name</li>
            <li>3. Press enter</li>
            <li>4. Add some symbols to your list</li>
            <li>5. Select a list</li>
            <li>6. Chose some symbols on symbols list</li>
          </ul>
          <h2 className="font-bold">You can also:</h2>
          <ol className="ml-4">
            <li> - Add multiples symbols to a list</li>
            <li> - Create multiples lists</li>
            <li> - Transit beetween lists</li>
          </ol>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 w-full mt-4">
          <GroupList />
          <SymbolsList />
        </div>
        <PriceTable />
      </div>
    </main>
  );
}
