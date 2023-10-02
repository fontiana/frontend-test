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
import { useEffect } from 'react'
import { BsSearch } from 'react-icons/bs'

const SYMBOL_LIST = [
  {
    id: 'ETHBTC',
  },
  {
    id: 'LTCBTC',
  },
  {
    id: 'BNBBTC',
  },
  {
    id: 'NEOBTC',
  },
]

export function Symbols() {
  return (
    <Flex
      flexDir="column"
      align="flex-start"
      w="100%"
      minH="100%"
      pb="32px"
      maxW={{ base: 'unset', md: '300px' }}
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
        {SYMBOL_LIST.map((symbol) => (
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            gap="32px"
            key={symbol.id}
            w="100%"
            p="16px"
          >
            <Checkbox
              defaultChecked={false}
              borderColor="gray.400"
              cursor="pointer"
            />
            <FormLabel m="0" p="0" cursor="pointer">
              {symbol.id}
            </FormLabel>
          </FormControl>
        ))}
      </Flex>
      <Flex w="100%" mt="16px">
        <Button w="100%" colorScheme="blue">
          Add to current list
        </Button>
      </Flex>
    </Flex>
  )
}
