import type { NextPage } from 'next'
import ProfitLeaderboard30D from '../components/elements/ProfitLeaderboard30D'
import Layout from '../components/layouts/Layout'

const Analytics: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="w-full m-auto pt-32 pb-4 px-12 flex justify-center items-center">
          <ProfitLeaderboard30D />
        </div>
      </Layout>
    </>
  )
}

export default Analytics 
