import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import ProfitLeaderboard from '../components/elements/ProfitLeaderboard'
import Layout from '../components/layouts/Layout'

const fetcher = (url: any) => axios.get(url).then((res: any) => res.data)

const Analytics: NextPage = () => {
  const data30dUrl = 'api/data/gain-rank-30days?limit=500'
  const { data: tradeData30 } = useSWR(data30dUrl, fetcher)

  const dataAllUrl = 'api/data/gain-rank-all?limit=1000'
  const { data: tradeDataAll } = useSWR(dataAllUrl, fetcher)

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [loading])

  return (
    <>
      <Layout>
        <div className="flex flex-col justify-center items-center px-12 pt-32 pb-4 m-auto w-full">
          <div
            className={`${
              loading ? 'opacity-0 translate-y-20' : 'opacity-100'
            } w-full m-auto flex justify-center transition-all duration-700 ease-in-out delay-75`}
          >
            <ProfitLeaderboard tradeData={tradeData30} />
          </div>
          <div
            className={`${
              loading ? 'opacity-0 translate-y-20' : 'opacity-100'
            } w-full m-auto flex justify-center transition-all duration-700 ease-in-out delay-300`}
          >
            <ProfitLeaderboard tradeData={tradeDataAll} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Analytics
