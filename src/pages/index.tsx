import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import SearchBar from '../components/elements/SearchBar'
import Layout from '../components/layouts/Layout'


const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="w-full flex justify-center items-center h-screen">
          <SearchBar />
        </div>
      </Layout>
    </>
  )
}

export default Home
