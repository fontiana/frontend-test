import { makeListAllExchangeSymbols } from '@/domain/factory/makeListAllExchangeSymbols'
import { ExchangeSymbol } from '@/types/Symbol'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface IExchangeInfoContext {
  symbolsList: Pick<ExchangeSymbol, 'symbol'>[]
}

const ExchangeInfoContext = createContext({} as IExchangeInfoContext)

export const ExchangeInfoProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [symbolsList, setSymbolsList] = useState<
    Pick<ExchangeSymbol, 'symbol'>[]
  >([])

  useEffect(() => {
    const listAllSymbols = makeListAllExchangeSymbols()
    listAllSymbols.execute().then((symbols) => {
      console.log({ symbols })
      setSymbolsList(symbols)
    })
  }, [])

  return (
    <ExchangeInfoContext.Provider value={{ symbolsList }}>
      {children}
    </ExchangeInfoContext.Provider>
  )
}

export const useExchangeInfo = () => {
  const context = useContext(ExchangeInfoContext)
  if (!context)
    throw new Error(
      'useExchangeInfo must be used within a ExchangeInfoProvider',
    )
  return context
}
