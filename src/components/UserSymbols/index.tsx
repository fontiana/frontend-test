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
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export function UserSymbols() {
  return (
    <Flex w="100%" flexDir="column" py="16px" overflowX="hidden">
      <Flex w="100%" gap="16px" px="16px">
        <Select defaultValue="list-a" w="100%" borderColor="gray.400">
          <option value="list-a">List A</option>
          <option value="list-b">List B</option>
          <option value="list-c">List C</option>
        </Select>
        <Button colorScheme="blue">
          <Icon as={AiOutlinePlusCircle} />
        </Button>
      </Flex>
      <TableContainer mt="16px" borderColor="gray.300" borderWidth="1px">
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
            {Array.from({ length: 4 }).map((_, index) => (
              <Tr key={index}>
                <Td>ETHBTC</Td>
                <Td>0.0025</Td>
                <Td>0.0024</Td>
                <Td>0.0026</Td>
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
                      20%
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
