export interface List {
  name: string
  symbolsInfo: {
    symbol: string
    lastPrice: number
    bidPrice: number
    askPrice: number
    priceChange: number
  }[]
}
