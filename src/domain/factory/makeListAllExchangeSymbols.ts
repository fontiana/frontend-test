import { ExchangeInfoRepository } from '../repository/ExchangeInfoRepository'
import { ListAllExchangeSymbols } from '../use-case/ListAllExchangeSymbols'

export function makeListAllExchangeSymbols() {
  const exchangeInfoRepository = new ExchangeInfoRepository()
  return new ListAllExchangeSymbols(exchangeInfoRepository)
}
