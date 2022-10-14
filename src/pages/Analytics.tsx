import type { NextPage } from 'next'
// import ProfitLeaderboard from '../components/elements/ProfitLeaderboard'
import Layout from '../components/layouts/Layout'
import dynamic from 'next/dynamic'
const ProfitLeaderboard = dynamic<any>(
  () => import("../components/elements/ProfitLeaderboard"),
  { ssr: false }
)

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
