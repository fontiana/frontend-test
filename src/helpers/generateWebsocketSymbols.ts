import { ExchangeSymbol } from '@/types/Symbol'

export function generateWebsocketSymbolsParam(
  symbols: Pick<ExchangeSymbol, 'symbol'>[],
) {
  return symbols.map((mySymbol) => `${mySymbol.symbol.toLowerCase()}@ticker`)
}
