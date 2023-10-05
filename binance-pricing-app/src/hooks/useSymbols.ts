import { useEffect, useState } from 'react';
import axios from 'axios';

interface UseSymbolsProps {
  symbols: string[];
  loading: boolean;
}

const useSymbols = (): UseSymbolsProps => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get('https://data.binance.com/api/v3/exchangeInfo')
      .then(response => {

        const symbols = response.data.symbols.map((s: any) => s.symbol);
        setSymbols(symbols);
        console.log('symbols', symbols);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar os símbolos:', error);
        setLoading(false);
      });
  }, []);

  return { symbols, loading };
};

export default useSymbols;
