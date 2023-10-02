import { Symbols } from '@/components/Symbols'
import { UserSymbols } from '@/components/UserSymbols'
import { makeListAllExchangeSymbols } from '@/domain/factory/makeListAllExchangeSymbols'
import { Divider, Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'

export default function Home() {
  return (
    <Flex
      flexDir={{ base: 'column', md: 'row' }}
      gap={{ base: '0px', md: '16px' }}
      minH="100vh"
    >
      <Symbols />
      <Divider
        h="1px"
        bg="gray.400"
        my="16px"
        display={{ base: 'block', md: 'none' }}
      />
      <UserSymbols />
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const listAllSymbols = makeListAllExchangeSymbols()

  const symbols = await listAllSymbols.execute()

  console.log({ symbols })

  return {
    props: {},
  }
}
