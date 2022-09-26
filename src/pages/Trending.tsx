import type { NextPage } from 'next'
import Layout from '../components/Layout'
import TrendingRankBoard from '../components/TrendingRankBoard'

const Trending: NextPage = () => {
  return (
    <>
      <Layout>
        <TrendingRankBoard />
      </Layout>
    </>
  )
}

export default Trending
