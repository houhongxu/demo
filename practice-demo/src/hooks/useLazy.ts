import React, { useEffect } from 'react'

const useLazy = (fn: () => void, ref: React.RefObject<Element>) => {
  useEffect(() => {
    let io: null | IntersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio <= 0) return

      fn()
      if (ref.current) {
        io?.unobserve(ref.current)
      }
      io = null
      console.log('Loaded')
    })

    if (ref.current) {
      io.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        io?.unobserve(ref.current)
      }
      io = null
    }
  }, [])
}
export { useLazy }
