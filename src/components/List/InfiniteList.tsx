import { useEffect, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useIntersectionObserver } from 'usehooks-ts'

 const InfiniteList: React.FC<
  React.PropsWithChildren<{
    onLoadMore: () => void
    canLoadMore?: boolean
    distance?: number
    debounceWait?: number
  }>
> = ({
  children,
  onLoadMore,
  canLoadMore = true,
  distance = 400,
  debounceWait = 300,
}) => {
  onLoadMore = useDebouncedCallback(onLoadMore, debounceWait)
  const endRef = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(endRef , {
    rootMargin: `0px 0px ${distance}px 0px`,
  })
  const shouldLoadMore = canLoadMore && !!entry?.isIntersecting
  useEffect(() => {
    if (!shouldLoadMore) return 
    onLoadMore()
  }, [entry, onLoadMore, shouldLoadMore])

  return (
    <>
      {children}
      <div ref={endRef}></div>
    </>
  )
}


export default InfiniteList