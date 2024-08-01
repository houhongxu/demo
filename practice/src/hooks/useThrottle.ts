import { useLatest } from './useLatest'
import { useEffect, useMemo, useState } from 'react'

const throttle = (fn: () => void, wait: number) => {
  let timer: NodeJS.Timeout | null

  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn()
      }, wait)
    }
  }
}

interface ThrottleOptions {
  wait: number
}

const useThrottle = <T>(value: T, options: ThrottleOptions) => {
  const [throttled, setThrottled] = useState(value)
  const { wait } = options

  const fnRef = useLatest(() => {
    setThrottled(value)
  })

  const run = useMemo(() => throttle(() => fnRef.current(), wait), [])

  useEffect(() => {
    run()
  }, [value])

  return throttled
}

export { useThrottle }
