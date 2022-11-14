import React from 'react'
import Layout from '../components/layouts/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import SearchResult from '../components/elements/SearchResult'
import SearchBar from '../components/elements/SearchBar'
import useSWR from 'swr'
import { orderBy } from 'lodash'

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json())

const Search = () => {
  const router = useRouter()
  const apiUrl = `api/data/search-data?q=${router.query.q}`

  const { data: buyAndSellData } = useSWR(apiUrl, fetcher)
  const buyData = buyAndSellData?.buyTransaction
  const sellData = buyAndSellData?.sellTransaction

  const newBuyData = buyData?.map((obj: any) => {
    obj.blockTime = obj.buyTime
    return obj
  })
  
  
  const newSellData = sellData?.map((obj: any) => {
    obj.blockTime = obj.sellTime
    return obj
  })

  const buyAndSellArray = Array.from(new Set(newBuyData?.concat(newSellData)))
  const finalData = orderBy(buyAndSellArray, ['blockTime'], ['desc'])
  console.log(finalData);
  

  return (
    <>
      <Head>
        <title>
          {router.query?.q}
          - ICU Search
        </title>
      </Head>
      <Layout>
        <section className="w-full">
          <div className="flex items-center pt-20 w-full">
            <div className="pb-10 m-auto w-full">
              <SearchResult results={finalData} />
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Search
