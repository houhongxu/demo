//阅读
import { useRef } from 'react'

function useLatest<T>(value: T) {
  const ref = useRef(value)
  ref.current = value

  return ref
}

export { useLatest }
