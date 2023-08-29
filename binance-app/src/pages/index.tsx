import { PriceDashboard } from '@/components/PriceDashboard';
import { SymbolList } from '@/components/SymbolList';

export default function Home() {
  return (
    <div className="p-4 h-screen flex gap-3">
      <SymbolList />
      <PriceDashboard />
    </div>
  );
}
