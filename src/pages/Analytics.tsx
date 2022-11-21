import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import ProfitLeaderboard from '../components/elements/ProfitLeaderboard'
import Layout from '../components/layouts/Layout'
import { useTradeData } from '../hooks/useTradeData'

const Analytics: NextPage = () => {
  const data30dUrl = 'api/data/gain-rank-30days?limit=500'
  const dataAllUrl = 'api/data/gain-rank-all?limit=1000'

  const { tradeData: tradeData30, loadingTradeData: isData30dLoading } =
    useTradeData(data30dUrl)
  const { tradeData: tradeDataAll, loadingTradeData: isDataAllLoading } =
    useTradeData(dataAllUrl)

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center px-12 pt-32 pb-4 m-auto w-full">
        <div
          className={`${
            isData30dLoading ? 'opacity-0 h-[666px] translate-y-20' : 'opacity-100'
          } w-full m-auto flex justify-center transition-all duration-700 ease-in-out delay-75`}
        >
          <ProfitLeaderboard tradeData={tradeData30} />
        </div>
        <div
          className={`${
            isDataAllLoading ? 'opacity-0 h-[666px] translate-y-20' : 'opacity-100'
          } w-full m-auto flex justify-center transition-all duration-700 ease-in-out delay-300`}
        >
          <ProfitLeaderboard tradeData={tradeDataAll} />
        </div>
      </div>
    </Layout>
  )
}

export default Analytics
