import { binanceApi } from '@/services/api'
import { ExchangeSymbol } from '@/types/Symbol'

interface GetAllAvailableSymbolsApiResponse {
  timezone: string
  serverTime: number
  symbols: ExchangeSymbol[]
}

interface IExchangeInfoRepository {
  getAllAvailableSymbols(): Promise<Pick<ExchangeSymbol, 'symbol'>[]>
}

export class ExchangeInfoRepository implements IExchangeInfoRepository {
  async getAllAvailableSymbols(): Promise<Pick<ExchangeSymbol, 'symbol'>[]> {
    try {
      const response = await binanceApi.get<GetAllAvailableSymbolsApiResponse>(
        '/exchangeInfo',
        {
          method: 'POST',
        },
      )
      return response.data.symbols
    } catch (err) {
      return []
    }
  }
}
