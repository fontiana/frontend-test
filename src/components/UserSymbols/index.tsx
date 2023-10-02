import {
  Flex,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from '@chakra-ui/react'

import { Inter } from 'next/font/google'
import { useExchangeInfo } from '@/context/useExchangeInfo'
import { CreateListModal } from '../CreateListModal'
import { useEffect } from 'react'
import { ListSymbolsInfo } from '@/types/List'
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export function UserSymbols() {
  const {
    selectedList: selectedListName,
    lists,
    handleSelectList,
    handleUpdateSymbolsInfo,
  } = useExchangeInfo()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const currentList = lists.find(
      (li) => li.name.toLowerCase() === selectedListName.toLowerCase(),
    )
    if (!currentList || currentList?.symbolsInfo?.length <= 0) return
    const url = process.env.NEXT_PUBLIC_WEBSOCKET_URL
    if (!url) return

    const symbolsParsed = currentList?.symbolsInfo
      .map((symbol) => `${symbol.symbol}@ticker`.toLowerCase())
      .join('/')

    const urlWithSymbols = `${url}?streams=${symbolsParsed}`

    const socket = new WebSocket(urlWithSymbols)
    socket.onerror = (event) => {
      console.log(
        'An error occurred while opening websocket connection: ',
        event,
      )
    }
    socket.onmessage = (event) => {
      const { data } = JSON.parse(event.data)
      const formattedData: ListSymbolsInfo = {
        symbol: data?.s,
        lastPrice: parseFloat(Number(data?.c ?? 0).toFixed(6)),
        bidPrice: parseFloat(Number(data?.b ?? 0).toFixed(6)),
        askPrice: parseFloat(Number(data?.a ?? 0).toFixed(6)),
        priceChange: parseFloat(Number(data?.P ?? 0).toFixed(2)),
      }
      handleUpdateSymbolsInfo(data?.s, formattedData)
    }

    return () => {
      socket.close()
      socket.onclose = (event) => {
        console.log('The websocket connection was closed. ', event)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists, selectedListName])

  return (
    <Flex w="100%" flexDir="column" py="16px" overflowX="hidden">
      <Flex w="100%" gap="16px" px="16px">
        <Select
          defaultValue="List A"
          w="100%"
          borderColor="gray.400"
          onChange={(e) => handleSelectList(e.target.value)}
        >
          {lists.map((list) => (
            <option key={list.name} value={list.name}>
              {list.name}
            </option>
          ))}
        </Select>
        <CreateListModal />
      </Flex>
      <TableContainer
        mt="16px"
        borderColor="gray.300"
        borderWidth="1px"
        borderRadius="12px"
      >
        <Table variant="unstyled">
          <Thead bg="gray.300" h="56px">
            <Tr>
              <Th
                textTransform="capitalize"
                fontSize="1rem"
                fontFamily={inter.style.fontFamily}
              >
                Symbol
              </Th>
              <Th
                textTransform="capitalize"
                fontSize="1rem"
                isNumeric
                fontFamily={inter.style.fontFamily}
              >
                Last Price
              </Th>
              <Th
                textTransform="capitalize"
                fontSize="1rem"
                isNumeric
                fontFamily={inter.style.fontFamily}
              >
                Bid Price
              </Th>
              <Th
                textTransform="capitalize"
                fontSize="1rem"
                isNumeric
                fontFamily={inter.style.fontFamily}
              >
                Ask Price
              </Th>
              <Th
                textTransform="capitalize"
                fontSize="1rem"
                fontFamily={inter.style.fontFamily}
              >
                Price Change(%)
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {lists
              ?.find((li) => li.name === selectedListName)
              ?.symbolsInfo?.sort((a, b) => a.symbol.localeCompare(b.symbol))
              ?.map((symbol) => (
                <Tr key={symbol.symbol}>
                  <Td>{symbol.symbol}</Td>
                  <Td>{symbol.lastPrice}</Td>
                  <Td>{symbol.bidPrice}</Td>
                  <Td>{symbol.askPrice}</Td>
                  <Td>
                    <Flex
                      align="center"
                      justify="center"
                      borderWidth="1px"
                      borderColor={
                        symbol.priceChange >= 0 ? 'green.300' : 'red.300'
                      }
                      bg={symbol.priceChange >= 0 ? 'green.100' : 'red.100'}
                      borderRadius="999px"
                      p="4px"
                      maxW="80px"
                      minW="40px"
                    >
                      <Text
                        color={
                          symbol.priceChange >= 0 ? 'green.700' : 'red.700'
                        }
                        fontWeight="500"
                      >
                        {symbol.priceChange}%
                      </Text>
                    </Flex>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  )
}
