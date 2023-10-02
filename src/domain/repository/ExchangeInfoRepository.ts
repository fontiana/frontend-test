import { binanceApi } from '@/services/api'
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
      const response =
        await binanceApi.get<GetAllAvailableSymbolsApiResponse>('exchangeInfo')
      return response.data.symbols.map((sy) => sy.symbol)
    } catch (err) {
      return []
    }
  }
}
