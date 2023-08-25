import { Badge } from '@/components/Badge';
import { PlusCircle } from '@phosphor-icons/react';

export function PriceDashboard() {
  return (
    <main className="border border-gray-200 rounded-lg flex-1 flex flex-col gap-3 px-2 py-8 shadow-xl">
      <header className="flex gap-2">
        <select
          name=""
          id=""
          className="border border-gray-200 rounded px-3 py-2 w-full min-h-[2.625rem]"
        >
          <option value="list-a">List A</option>
        </select>

        <button className="bg-teal-500 p-2 rounded min-w-[2.625rem] flex items-center justify-center transition-colors hover:bg-teal-600">
          <PlusCircle className="w-5 h-5 text-white" />
        </button>
      </header>

      <div className="overflow-y-auto">
        <table className="w-full">
          <thead className="h-[3.75rem]">
            <tr className="gap-8 bg-gray-200">
              <th className="p-4">Symbol</th>
              <th className="p-4">Last Price</th>
              <th className="p-4">Bid Price</th>
              <th className="p-4">Ask Price</th>
              <th className="p-4">Price Change (%)</th>
            </tr>
          </thead>

          <tbody>
            <tr className="gap-8">
              <th className="p-4 font-normal">ETHBTC</th>
              <th className="p-4 font-normal">0.0025</th>
              <th className="p-4 font-normal">0.0024</th>
              <th className="p-4 font-normal">0.0026</th>
              <th className="p-4 font-normal">
                <Badge>250%</Badge>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
