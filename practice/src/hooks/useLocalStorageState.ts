import { useMemoizedFn, useUpdateEffect } from 'ahooks'
import { useState } from 'react'

interface Options<T> {
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
}
interface OptionsWithDefaultValue<T> extends Options<T> {
  defaultValue: T
}

const useLocalStorageState = <T>(key: string, options?: Options<T> & OptionsWithDefaultValue<T>) => {
  const serilaizer = (value: T) => {
    if (options?.serializer) {
      return options?.serializer(value)
    }
    return JSON.stringify(value)
  }

  const deserilaizer = (value: string) => {
    if (options?.deserializer) {
      return options?.deserializer(value)
    }
    return JSON.parse(value)
  }

  const getStorageValue = () => {
    const raw = localStorage.getItem(key)
    if (raw) {
      return deserilaizer(raw)
    }
    if (typeof options?.defaultValue === 'function') {
      return options?.defaultValue()
    }
    return options?.defaultValue
  }

  const [state, setState] = useState<undefined | T>(getStorageValue())

  const updateState = (value?: T) => {
    if (typeof value === 'undefined') {
      setState(undefined)
      localStorage.removeItem(key)
    } else if (typeof value === 'function') {
      const currentState = value(state)
      setState(currentState)
      localStorage.setItem(key, serilaizer(value))
    } else {
      setState(value)
      localStorage.setItem(key, serilaizer(value))
    }
  }

  useUpdateEffect(() => {
    setState(getStorageValue())
  }, [key])

  return [state, useMemoizedFn(updateState)]
}
export { useLocalStorageState }
