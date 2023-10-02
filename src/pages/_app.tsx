import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/styles/theme'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Box className={inter.className} bg="gray.200" minH="100vh" px="16px">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}
