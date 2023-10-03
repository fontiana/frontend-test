export interface ListSymbolsInfo {
  symbol: string
  lastPrice: number
  bidPrice: number
  askPrice: number
  priceChange: number
}
export interface List {
  name: string
  symbolsInfo: ListSymbolsInfo[]
}
