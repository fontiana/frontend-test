import { ExchangeSymbol } from '@/types/Symbol'

interface GetAllAvailableSymbolsApiResponse {
  timezone: string
  serverTime: number
  symbols: ExchangeSymbol[]
}

interface IExchangeInfoRepository {
  getAllAvailableSymbols(): Promise<ExchangeSymbol['symbol'][]>
}

export class ExchangeInfoRepository implements IExchangeInfoRepository {
  async getAllAvailableSymbols(): Promise<ExchangeSymbol['symbol'][]> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_REST_URL}/exchangeInfo`,
        {
          method: 'GET',
        },
      )
      const data: GetAllAvailableSymbolsApiResponse = await response.json()
      return data.symbols.map((sy) => sy.symbol)
    } catch (err) {
      return []
    }
  }
}
