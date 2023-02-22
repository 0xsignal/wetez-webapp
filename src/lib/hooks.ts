import { useIsomorphicLayoutEffect } from 'usehooks-ts'
import { useMemo, useRef } from 'react'

export function useEvent<R, F extends (...args: any[]) => R>(fn: F) {
  const ref = useRef(fn)
  useIsomorphicLayoutEffect(() => {
    ref.current = fn
  })
  return useMemo(
    () =>
      (...args: Parameters<F>): R => {
        const { current } = ref
        return current(...args)
      },
    [],
  )
}
