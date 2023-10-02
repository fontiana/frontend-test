import { makeListAllExchangeSymbols } from '@/domain/factory/makeListAllExchangeSymbols'
import { List } from '@/types/List'
import { ExchangeSymbol } from '@/types/Symbol'
import React, { createContext, useContext, useEffect, useState } from 'react'
import _ from 'lodash'

interface IExchangeInfoContext {
  symbolsList: ExchangeSymbol['symbol'][]
  completedSymbolsList: ExchangeSymbol['symbol'][]
  fetchMoreSymbols: () => void

  lists: List[]
  selectedList: List
  createNewList: (name: string) => void
  handleSelectList: (name: string) => void
  handleAddSymbolsToCurrentList: (symbols: ExchangeSymbol['symbol'][]) => void
}
const ExchangeInfoContext = createContext({} as IExchangeInfoContext)
const PAGE_LIMIT = 20

export const ExchangeInfoProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [completedSymbolsList, setCompletedSymbolsList] = useState<
    ExchangeSymbol['symbol'][]
  >([])
  const [symbolsList, setSymbolsList] = useState<ExchangeSymbol['symbol'][]>([])
  const [page, nextPage] = useState(1)
  const [lists, setLists] = useState<List[]>([
    { name: 'Lista A', symbolsInfo: [] },
  ])
  const [selectedList, setSelectedList] = useState<List>(lists[0])

  useEffect(() => {
    const listAllSymbols = makeListAllExchangeSymbols()
    listAllSymbols.execute().then((symbols) => {
      console.log({ symbols })
      setCompletedSymbolsList(symbols)
    })
  }, [])

  useEffect(() => {
    setSymbolsList(completedSymbolsList.slice(0, page * PAGE_LIMIT))
  }, [completedSymbolsList, page])

  const fetchMoreSymbols = () => {
    nextPage((prevPage) => {
      if (prevPage + 1 > completedSymbolsList.length) return prevPage
      return prevPage + 1
    })
  }

  const createNewList = (name: string) => {
    const newList: List = {
      name,
      symbolsInfo: [],
    }
    setLists((prevLists) => [...prevLists, newList])
  }

  const handleSelectList = (name: string) => {
    const findedList = lists.find((list) => list.name === name)
    if (!findedList) return
    setSelectedList(findedList)
  }

  const handleAddSymbolsToCurrentList = (
    symbols: ExchangeSymbol['symbol'][],
  ) => {
    const newSymbols: List['symbolsInfo'] = symbols.map((symbol) => ({
      symbol,
      askPrice: 0,
      bidPrice: 0,
      lastPrice: 0,
      priceChange: 0,
    }))
    setSelectedList((prev) => {
      const newSymbolsInfo = [...prev.symbolsInfo, ...newSymbols]
      const filteredSymbols = _.uniqBy(newSymbolsInfo, 'symbol')
      return {
        ...prev,
        symbolsInfo: filteredSymbols,
      }
    })
  }

  return (
    <ExchangeInfoContext.Provider
      value={{
        symbolsList,
        completedSymbolsList,
        fetchMoreSymbols,
        lists,
        createNewList,
        selectedList,
        handleSelectList,
        handleAddSymbolsToCurrentList,
      }}
    >
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
