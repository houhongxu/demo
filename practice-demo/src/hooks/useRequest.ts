import { useLatest } from 'ahooks'
import { useMemo, useRef, useState } from 'react'

const useRequest = (fn: (...args: any) => Promise<string>) => {
  const argsRef = useRef<Array<any>>()
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)
  const fnRef = useLatest(fn)

  const run = useMemo(
    () =>
      async (...args: any) => {
        argsRef.current = args

        setLoading(true)

        const data = await fnRef.current(...args)
        if (data) {
          setData(data)
        }

        setLoading(false)
      },
    []
  )

  const refresh = useMemo(
    () => () => {
      if (argsRef.current) {
        run(...argsRef.current)
      }
    },
    []
  )

  return {
    data,
    loading,
    run,
    refresh,
  }
}

export { useRequest }
