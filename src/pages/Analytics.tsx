import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import ProfitLeaderboard30D from '../components/elements/ProfitLeaderboard30D'
import ProfitLeaderboardAll from '../components/elements/ProfitLeaderboardAll'
import Layout from '../components/layouts/Layout'

const Analytics: NextPage = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [loading])

  return (
    <>
      <Layout>
        <div className="w-full m-auto pt-32 pb-4 px-12 flex flex-col justify-center items-center">
          <div className={`${loading ? "opacity-0 translate-y-20" : "opacity-100"} w-full m-auto flex justify-center transition-all duration-700 ease-in-out delay-75`}>
            <ProfitLeaderboard30D />
          </div>
          <div className={`${loading ? "opacity-0 translate-y-20" : "opacity-100"} w-full m-auto flex justify-center transition-all duration-700 ease-in-out delay-300`}>
            <ProfitLeaderboardAll />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Analytics 
