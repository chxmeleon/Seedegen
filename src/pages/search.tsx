import React from 'react'
import Layout from '../components/layouts/Layout'
import axios from 'axios'
import { useRouter } from "next/router";
import { GetServerSideProps } from 'next'
import Head from 'next/head';
import SearchResult from '../components/elements/SearchResult';
import SearchBar from '../components/elements/SearchBar';



const Search = ({ results }:any) => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{router.query.q} - ICU Search</title>
      </Head>
      <Layout>
        <section className="w-full">
          <div className="flex items-center w-full pt-20">
            <div className="m-auto w-full py-10">
              <SearchResult results={results} />
            </div>
          </div>
        </section>
      </Layout>
    </>


  )
}

export default Search


export const getServerSideProps: GetServerSideProps = async (context) => {
  const options = {
    method: 'GET',
    url: 'https://crypto-news-live11.p.rapidapi.com/news/nft',
    params: { page: '1', per_page: '12' },
    headers: {
      'X-RapidAPI-Key': '74e6c313e1msh265e7c4417b96ffp14c59ejsn4340171da7e8',
      'X-RapidAPI-Host': 'crypto-news-live11.p.rapidapi.com',
    },
  }

  const data = await axios
    .request(options)
    .then(function(response) {
      return response.data
    })

  return {
    props: {
      results: data,
    }
  }
}

