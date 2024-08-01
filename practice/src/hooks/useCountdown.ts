import { useEffect, useMemo } from 'react'
import { useLatest } from './useLatest'
import { useLocalStorageState } from './useLocalStorageState'

const useInterval = (fn: any, delay: any) => {
  const fnRef = useLatest(fn)

  useEffect(() => {
    if (delay) {
      const timer = setInterval(() => {
        fnRef.current()
      }, delay)

      return () => {
        clearInterval(timer)
      }
    }
  }, [delay])
}

const useCountdown = (delay: any) => {
  const [localCount, setLocalCount] = useLocalStorageState('local-count', {
    defaultValue: delay,
  })

  const refresh = useMemo(() => {
    setLocalCount(delay)
  }, [])

  useInterval(
    () => {
      setLocalCount((localCount: number) => localCount - 1)
    },
    localCount === 0 ? null : 1000
  )
  return [localCount, refresh]
}

export { useCountdown }
