import type { NextPage } from 'next'
import React, { useMemo, useState } from 'react'
import Layout from '../components/layouts/Layout'
import { useRouter } from 'next/router'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import useSWR from 'swr'
import dynamic from 'next/dynamic'
import SearchResultSkeleton from '../components/elements/SearchResultSkeleton'

const SearchResult = dynamic(
  () => import('../components/elements/SearchResult'),
  { ssr: false }
)

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json())

const Home: NextPage = () => {
  const query = 'nft'
  const [pageIndex, setPageIndex] = useState(1)
  const [result, setResult] = useState<Array<null>>([])
  const apiPath = `api/data/search-data?q=${query}&page=${pageIndex}`
  const { data: searchData, error } = useSWR(apiPath, fetcher)
  const isLoading = !searchData && !error
  const isNotFound = !result?.length

  const hasNextPage = useMemo(
    () => pageIndex !== 10 && !!query,
    [pageIndex, query]
  )

  const loadMore = () => {
    setPageIndex(() => pageIndex + 1)
    setTimeout(() => {
      setResult((result) => [...result, ...searchData])
    }, 1370)
  }

  const [searchRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px',
  })

  return (
    <Layout>
      <section className="w-full">
        <div className="w-full">
          <SearchResult results={result} />
          {(isLoading || hasNextPage) && (
            <div ref={searchRef}>
              {[...new Array(3)].map((_val, idx: number) => (
                <SearchResultSkeleton key={idx} />
              ))}
            </div>
          )}
          {isNotFound && (
            <div className="mt-[28%] flex justify-center items-center text-5xl font-medium">
              <h1>Search is Not Found</h1>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default Home
