import { useRef, useEffect } from 'react'

type Timer = ReturnType<typeof setTimeout>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SomeFunction = (...args: any[]) => void
/**
 * Atrasa a execução de uma função com base no tempo passado
 * @param func A função original à ser executada
 * @param delay O tempo em milissegundos para atrasar a execução
 * @returns A função debounced, que será executada apenas se a função debounced não tiver sido chamada nos últimos (delay) ms
 */
export function useDebounce<Func extends SomeFunction>(
  func: Func,
  delay = 1000,
) {
  const timer = useRef<Timer>()

  useEffect(() => {
    return () => {
      if (!timer.current) return
      clearTimeout(timer.current)
    }
  }, [])

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args)
    }, delay)
    clearTimeout(timer.current)
    timer.current = newTimer
  }) as Func

  return debouncedFunction
}
