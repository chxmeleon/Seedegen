import React, { useMemo, useState } from 'react'
import Layout from '../components/layouts/Layout'
import { useRouter } from 'next/router'
import Head from 'next/head'
// import SearchResult from '../components/elements/SearchResult'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import useSWR from 'swr'
import CircularProgress from '@mui/material/CircularProgress'
import dynamic from 'next/dynamic'

const SearchResult = dynamic(
  () => import('../components/elements/SearchResult'),
  { ssr: false }
)

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json())

const Search = () => {
  const router = useRouter()
  const query = router.query.q
  const [pageIndex, setPageIndex] = useState(1)
  const [result, setResult] = useState<Array<null>>([])
  const apiPath = `api/data/search-data?q=${query}&page=${pageIndex}`
  const { data: searchData, error } = useSWR(apiPath, fetcher)
  const isLoading = !searchData && !error
  

  const hasNextPage = useMemo(() => pageIndex !== 10 && !!query, [pageIndex, query])
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
    <>
      <Head>
        <title>{router.query?.q}- ICU Search</title>
      </Head>
      <Layout>
        <section className="w-full">
          <div className="flex items-center pt-20 w-full">
            <div className="pb-10 m-auto w-full">
              <section className="flex items-center w-full">
                <div className="m-auto w-full max-w-[1300px]">
                  <div className="w-[45%] ml-[20%]">
                    <SearchResult results={result} isLoading={isLoading} />
                    {(isLoading || hasNextPage) && (
                      <div
                        ref={searchRef}
                        className="flex justify-center py-32"
                      >
                        <CircularProgress size={80} />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Search
