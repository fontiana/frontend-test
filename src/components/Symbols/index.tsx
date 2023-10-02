import { useExchangeInfo } from '@/context/useExchangeInfo'
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { Suspense, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { SymbolCheckBox } from '../SymbolCheckBox'
import { useDebounce } from '@/hooks/useDebounce'

export function Symbols() {
  const [searchedTerm, setSearchedTerm] = useState('')
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([])
  const {
    completedSymbolsList,
    symbolsList,
    handleAddSymbolsToCurrentList,
    selectedList,
  } = useExchangeInfo()

  const debounceSearch = useDebounce(
    (term: string) => setSearchedTerm(term),
    1000,
  )

  const handleAddSymbols = () => {
    handleAddSymbolsToCurrentList(selectedList, selectedSymbols)
    setSelectedSymbols([])
  }

  console.log({ searchedTerm })

  return (
    <Flex
      flexDir="column"
      align="flex-start"
      w="100%"
      minH="100%"
      pb="32px"
      maxW={{ base: 'unset', md: '300px' }}
      maxH="100%"
    >
      <FormControl py="16px">
        <InputGroup>
          <Input
            placeholder="Search"
            borderWidth="1px"
            borderRadius="12px"
            borderColor="gray.400"
            outline="0px"
            _focusVisible={{ borderColor: 'gray.900' }}
            onChange={(e) => debounceSearch(e.target.value)}
          />
          <InputRightElement pointerEvents="none">
            <Icon as={BsSearch} />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Flex
        flexDir="column"
        w="100%"
        borderColor="gray.300"
        borderWidth="1px"
        h="100%"
        borderRadius="12px"
        maxH="80vh"
      >
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap="32px"
          bg="gray.300"
          w="100%"
          p="16px"
          borderTopRadius="12px"
        >
          <Checkbox
            defaultChecked={false}
            isChecked={false}
            borderColor="gray.400"
          />
          <FormLabel m="0" p="0">
            Symbol
          </FormLabel>
        </FormControl>
        <Flex flexDir="column" h="100%" overflowY="auto">
          <Suspense fallback={<span>Carregando...</span>}>
            {searchedTerm.length > 0 ? (
              <>
                {completedSymbolsList
                  .filter((sy) => sy.toLowerCase().includes(searchedTerm))
                  .map((symbol, index, arr) => (
                    <SymbolCheckBox
                      key={symbol}
                      symbol={symbol}
                      isChecked={selectedSymbols.includes(symbol)}
                      setSelectedSymbols={setSelectedSymbols}
                      isLast={index === arr.length - 1}
                    />
                  ))}
              </>
            ) : (
              <>
                {symbolsList.map((symbol, index, arr) => (
                  <SymbolCheckBox
                    key={symbol}
                    symbol={symbol}
                    isChecked={selectedSymbols.includes(symbol)}
                    setSelectedSymbols={setSelectedSymbols}
                    isLast={index === arr.length - 1}
                  />
                ))}
              </>
            )}
          </Suspense>
        </Flex>
      </Flex>
      <Flex w="100%" mt="16px">
        <Button
          w="100%"
          colorScheme="blue"
          isDisabled={selectedSymbols.length <= 0}
          onClick={() => handleAddSymbols()}
        >
          Add to current list
        </Button>
      </Flex>
    </Flex>
  )
}
