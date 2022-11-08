import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import Layout from '../components/layouts/Layout'
import SearchBar from '../components/elements/SearchBar'
import { useRouter } from 'next/router'


const Home: NextPage = () => {

  return (
    <>
      <Layout>
        <div className="flex justify-center items-center w-full h-screen">
          <div className="m-auto w-full text-center">
            <h1 className="pb-12 text-6xl font-semibold">ICU</h1>
            <div className="flex justify-center items-center">
              <SearchBar />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home
