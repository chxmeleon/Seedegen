import type { NextPage } from 'next'
import ProfitLeaderboard from '../components/elements/ProfitLeaderboard'
import Layout from '../components/layouts/Layout'

const Analytics: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="w-full m-auto py-64 flex justify-center items-center">
          <ProfitLeaderboard />
        </div>
      </Layout>
    </>
  )
}

export default Analytics 
