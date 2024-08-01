import { useLatest } from './useLatest'
import { useEffect, useMemo, useState } from 'react'

const debounce = (fn: () => void, wait: number) => {
  let timer: NodeJS.Timeout
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, wait)
  }
}
interface DebounceOptions {
  wait: number
}

const useDebounce = <T>(value: T, options: DebounceOptions) => {
  const [debounced, setDebounced] = useState(value)
  const { wait } = options

  const fnRef = useLatest(() => {
    setDebounced(value)
  })

  const run = useMemo(() => debounce(() => fnRef.current(), wait), [])

  useEffect(() => {
    run()
  }, [value])

  return debounced
}
export { useDebounce }
