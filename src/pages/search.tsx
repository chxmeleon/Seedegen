import React from 'react'
import Layout from '../components/layouts/Layout'
import axios from 'axios'
import { useRouter } from "next/router";
import { GetServerSideProps } from 'next'
import Head from 'next/head';
import SearchResult from '../components/elements/SearchResult';
import SearchBar from '../components/elements/SearchBar';
import useSWR from 'swr'

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json())

const Search = () => {
  const router = useRouter()

  const apiUrl = 'api/data/win-and-lose?offset=0&limit=10'

  const { data: winAndLose } = useSWR(apiUrl, fetcher)
  

  return (
    <>
      <Head>
        <title>{router.query.q} - ICU Search</title>
      </Head>
      <Layout>
        <section className="w-full">
          <div className="flex items-center w-full pt-20">
            <div className="m-auto w-full pb-10">
              <SearchResult results={winAndLose} />
            </div>
          </div>
        </section>
      </Layout>
    </>


  )
}

export default Search
