import { useExchangeInfo } from '@/context/useExchangeInfo'
import { Checkbox, FormControl, FormLabel } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

interface SymbolCheckBoxProps {
  symbol: string
  setSelectedSymbols: React.Dispatch<React.SetStateAction<string[]>>
  isChecked: boolean
  isLast: boolean
}

export function SymbolCheckBox({
  symbol,
  setSelectedSymbols,
  isChecked,
  isLast,
}: SymbolCheckBoxProps) {
  const { fetchMoreSymbols } = useExchangeInfo()
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        fetchMoreSymbols()
        observer.unobserve(entry.target)
      }
    })

    observer.observe(ref.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLast])

  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      gap="32px"
      key={symbol}
      w="100%"
      p="16px"
      ref={ref}
    >
      <Checkbox
        defaultChecked={false}
        isChecked={isChecked}
        borderColor="gray.400"
        cursor="pointer"
        onChange={() => {
          setSelectedSymbols((prevSelectedSymbols) =>
            prevSelectedSymbols.includes(symbol)
              ? prevSelectedSymbols.filter(
                  (prevSymbol) => prevSymbol !== symbol,
                )
              : [...prevSelectedSymbols, symbol],
          )
        }}
      />
      <FormLabel m="0" p="0" cursor="pointer">
        {symbol}
      </FormLabel>
    </FormControl>
  )
}
