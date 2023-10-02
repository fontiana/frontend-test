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
  selectedList: string
  createNewList: (name: string) => void
  handleAddSymbolsToCurrentList: (
    currentListName: string,
    symbols: ExchangeSymbol['symbol'][],
  ) => void
  handleSelectList: (listName: string) => void
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
  const [selectedList, setSelectedList] = useState('Lista A')

  useEffect(() => {
    const listAllSymbols = makeListAllExchangeSymbols()
    listAllSymbols.execute().then((symbols) => {
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

  const handleAddSymbolsToCurrentList = (
    currentListName: string,
    symbols: ExchangeSymbol['symbol'][],
  ) => {
    const currentList = lists.find(
      (li) => li.name.toLowerCase() === currentListName.toLowerCase(),
    )
    if (!currentList) return

    const newSymbols: List['symbolsInfo'] = symbols.map((symbol) => ({
      symbol,
      askPrice: 0,
      bidPrice: 0,
      lastPrice: 0,
      priceChange: 0,
    }))
    const uniqSymbols = _.uniqBy(
      [...currentList.symbolsInfo, ...newSymbols],
      'symbol',
    )
    setLists((prevLists) => {
      const listsWithoutOldList = prevLists.filter(
        (li) => li.name.toLowerCase() !== currentListName.toLowerCase(),
      )
      return [
        ...listsWithoutOldList,
        { ...currentList, symbolsInfo: uniqSymbols },
      ]
    })
  }

  const handleSelectList = (listName: string) => {
    setSelectedList(listName)
  }

  console.log({ lists, selectedList })

  return (
    <ExchangeInfoContext.Provider
      value={{
        symbolsList,
        completedSymbolsList,
        fetchMoreSymbols,
        lists,
        createNewList,
        handleAddSymbolsToCurrentList,
        selectedList,
        handleSelectList,
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
