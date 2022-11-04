import React, { useEffect } from 'react'
import prisma from '../../lib/prisma'
import { GetServerSideProps } from 'next'
import Layout from '../../components/layouts/Layout'
import { Line, Pie } from 'react-chartjs-2'

const Trader = (props: any) => {
  const { winLoseData, rankMergeData } = props
  const rankData = rankMergeData?.[0]

  const etherscanUrl = winLoseData?.[0]?.walletEtherscanUrl
  const openseaUrl = winLoseData?.[0]?.walletOpenseaUrl
  const ens = rankData.ens
  const profit = rankData.profit.toFixed(2)
  const spent = rankData.spent.toFixed(2)
  const received = rankData.received.toFixed(2)
  const roi = rankData.roi.toFixed(2)

  const address = winLoseData?.[0]?.walletAddress.toString()
  const statusArray = winLoseData.map((item: any) => item.status.toLowerCase())
  const winCounts = statusArray.filter(
    (value: string) => value === 'win'
  ).length
  const loseCounts = winLoseData.length - winCounts
  console.log(winLoseData)
  const data = {
    labels: ['Win', 'Lose'],
    datasets: [
      {
        data: [winCounts, loseCounts],
        backgroundColor: ['#f5c858', '#217cad'],
        hoverBackgroundColor: ['#f5c858', '#217cad'],
      },
    ],
  }

  return (
    <Layout>
      <div className="flex justify-center w-full h-screen">
        <div className="px-16 my-20 mx-auto w-full max-w-[1300px]">
          <div className="flex justify-between items-center">
            <div className="p-12 w-64">
              <h1 className="text-4xl font-medium">{ens}</h1>
              <p className="truncate">{address}</p>
            </div>
            <div></div>
          </div>
          <div className="grid grid-cols-2 gap-10 justify-items-center py-20 w-full bg-gray-700">
            <div>
              <p>Profit</p>
              <p>{profit}</p>
            </div>
            <div>
              <p>Total Spent</p>
              <p>{spent}</p>
            </div>
            <div>
              <p>Total Revenue</p>
              <p>{received}</p>
            </div>
            <div>
              <p>Win & Lose</p>
              <p>{winCounts}</p>
              <p>{loseCounts}</p>
            </div>
          </div>
          <div className="w-[200px] flex justify-end">
            <Pie data={data} width={100} height={100} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const address = context.query.id?.toString() || ''
  const winLose = await prisma.winAndLose.findMany({
    where: {
      walletAddress: address,
    },
    select: {
      walletAddress: true,
      walletOpenseaUrl: true,
      walletEtherscanUrl: true,
      projectEtherscanUrl: true,
      projectAddress: true,
      tokenId: true,
      buyTxHash: true,
      buyTxHashUrl: true,
      sellTxHash: true,
      sellTxHashUrl: true,
      status: true,
      cost: true,
      got: true,
      net: true,
    },
  })

  const rank30days = await prisma.nftProfitLeaderboard30days.findMany({
    where: {
      address: address,
    },
    select: {
      ens: true,
      address: true,
      profit: true,
      received: true,
      roi: true,
      spent: true,
      totalTradeTxCounts: true,
      totalVolumes: true,
    },
  })

  const rankAll = await prisma.nftProfitLeaderboardAll.findMany({
    where: {
      address: address,
    },
    select: {
      ens: true,
      address: true,
      profit: true,
      received: true,
      roi: true,
      spent: true,
      totalTradeTxCounts: true,
      totalVolumes: true,
    },
  })

  const merge = Array.from(new Set(rankAll.concat(rank30days)))

  return {
    props: {
      winLoseData: winLose,
      rankMergeData: merge,
    },
  }
}

export default Trader
