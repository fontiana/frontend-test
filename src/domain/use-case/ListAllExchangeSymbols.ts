import { ExchangeSymbol } from '@/types/Symbol'
import { ExchangeInfoRepository } from '../repository/ExchangeInfoRepository'

export class ListAllExchangeSymbols {
  constructor(private exchangeInfoRepository: ExchangeInfoRepository) {}

  async execute(): Promise<Pick<ExchangeSymbol, 'symbol'>[]> {
    const symbols = await this.exchangeInfoRepository.getAllAvailableSymbols()
    return symbols
  }
}
