import {
  Button,
  Flex,
  Icon,
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
import { AiOutlinePlusCircle } from 'react-icons/ai'

import { Inter } from 'next/font/google'
import { useExchangeInfo } from '@/context/useExchangeInfo'
import { CreateListModal } from '../CreateListModal'
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export function UserSymbols() {
  const { selectedList, lists, handleSelectList } = useExchangeInfo()

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
              ?.find((li) => li.name === selectedList)
              ?.symbolsInfo?.map((symbol) => (
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
                      borderColor="green.300"
                      bg="green.100"
                      borderRadius="999px"
                      p="4px"
                      maxW="80px"
                      minW="40px"
                    >
                      <Text color="green.700" fontWeight="500">
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
