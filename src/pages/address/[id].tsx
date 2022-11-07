import React, { useEffect, useState } from 'react'
import prisma from '../../lib/prisma'
import { GetServerSideProps } from 'next'
import Layout from '../../components/layouts/Layout'
import { Bar, Doughnut } from 'react-chartjs-2'
import tw from 'twin.macro'
import Link from 'next/link'
import WinAndLoseForm from '../../components/elements/WinAndLoseForm'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const Trader = (props: any) => {
  const { winLoseData, rankMergeData } = props
  const rankData = rankMergeData?.[0]

  const etherscanUrl = winLoseData?.[0]?.walletEtherscanUrl
  const openseaUrl = winLoseData?.[0]?.walletOpenseaUrl
  const ens = rankData.ens
  const totalProfit = rankData.profit.toFixed(2)
  const totalSpent = rankData.spent.toFixed(2)
  const totalReceived = rankData.received.toFixed(2)
  const totalRoi = rankData.roi.toFixed(2)

  const address = winLoseData?.[0]?.walletAddress.toString()
  const statusArray = winLoseData.map((item: any) => item.status.toLowerCase())
  const winCounts = statusArray.filter(
    (value: string) => value === 'win'
  ).length
  const loseCounts = winLoseData.length - winCounts

  const [page, setPage] = useState(1)
  const offset = (page - 1) * 10 ?? 0
  const counts = Math.ceil(winLoseData.length / 10)

  const handleChange = (e: any, v: any) => {
    setPage(v)
  }

  const currentPage = winLoseData?.slice(0 + offset, 10 + offset)

  const [mode, setMode] = useState('🏆')
  const winLoseBoard = currentPage.map((data: any, idx: any) => {
    const status = data?.status.toLowerCase()

    const transMode = () => {
      if (status === 'win') {
        return '🏆 Win'
      } else {
        return '💸 Lose'
      }
    }
    const spent = data?.cost
    const revernced = data?.got
    const profit = data?.net
    const buyTxHashUrl = data?.buyTxHashUrl
    const sellTxHashUrl = data?.sellTxHashUrl

    return (
      <WinAndLoseForm
        key={idx.toString()}
        id={'winlose-' + idx.toString()}
        spent={spent}
        revernced={revernced}
        status={transMode()}
        profit={profit}
        spentTxHashUrl={buyTxHashUrl}
        recerncedTxHashUrl={sellTxHashUrl}
      />
    )
  })

  const pieOpt = {
    plugins: {
      legend: { display: false },
    },
  }

  const pieData = {
    labels: ['Win', 'Lose'],
    datasets: [
      {
        data: [winCounts, loseCounts],
        backgroundColor: ['#07b7e8', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  }

  const barOpt = {
    plugins: {
      legend: { display: false },
    },
  }

  const barData = {
    labels: [
      'Total Profit',
      'Total Spent',
      'Total Received',
      'ROI',
      'Gas Spent',
    ],
    datasets: [
      {
        data: [totalProfit, totalSpent, totalReceived, totalRoi, 190],
        borderColor: ['#22d3ee'],
        backgroundColor: ['#22d3ee'],
        borderWidth: 1,
        barThickness: 40,
      },
    ],
  }

  const DashContainer = tw.div`w-full h-full dark:bg-gray-900 flex justify-center text-center items-center rounded-md`

  return (
    <Layout>
      <div className="flex w-full">
        <div className="py-20 px-16 mx-auto w-full max-w-[1300px]">
          <div className="flex justify-between items-center py-5">
            <div className="flex justify-between items-center mr-4 rounded-lg h-[250px] dark:bg-slate-800">
              <div className="px-12">
                <div className="flex justify-between">
                  <div className="overflow-hidden w-20 h-20 bg-orange-50 rounded-full">
                    <img
                      src="https://i.seadn.io/gae/A2bMxcJgg6y4iyDi6FL9NegYOstM42QE5Lq-z645N4ILc-TJG6kZFRHgXLGOT9k_NGa0o6ie2-pY4yn09Wf8sJeLhMd_6j9uCNae?auto=format&w=3840"
                      alt="avatar"
                    />
                  </div>
                  <div>
                    <Link href={openseaUrl}>
                      <a
                        aria-label="trader opensea link"
                        target="_blank"
                        rel="noopener"
                      >
                        <div>opensea</div>
                      </a>
                    </Link>
                    <Link href={etherscanUrl}>
                      <a
                        aria-label="trader etherscan link"
                        target="_blank"
                        rel="noopener"
                      >
                        <div>etherscan</div>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="w-96">
                  <h1 className="pt-5 pb-1 w-1/2 text-3xl font-medium truncate">
                    {address}
                  </h1>
                  <div className="">{ens}</div>
                </div>
              </div>
            </div>
            <div className="mini-dashboard-grid">
              <DashContainer>
                <div>
                  <p>Total Profit</p>
                  <p>{totalProfit}</p>
                </div>
              </DashContainer>
              <DashContainer>
                <div>
                  <p>Total Spent</p>
                  <p>{totalSpent}</p>
                </div>
              </DashContainer>
              <DashContainer>
                <div>
                  <p>Total Revenue</p>
                  <p>{totalReceived}</p>
                </div>
              </DashContainer>
              <DashContainer>
                <div>
                  <p>Win & Lose</p>
                  <p>
                    {winCounts} / {loseCounts}
                  </p>
                </div>
              </DashContainer>
              <DashContainer>
                <div>
                  <p>ROI</p>
                  <p>{totalRoi}</p>
                </div>
              </DashContainer>
              <DashContainer>
                <div>
                  <p>Gas Spent</p>
                  <p>{totalRoi} ETH</p>
                </div>
              </DashContainer>
            </div>
          </div>
          <div className="flex justify-between items-center pb-6 w-full">
            <div className="flex flex-col items-center p-2 py-2.5 mr-2 w-2/3 rounded-md dark:bg-slate-800">
              <div className="py-4 text-3xl font-semibold dark:text-slate-100">
                Data Bar Chart
              </div>
              <div className="p-4  w-full">
                <Bar data={barData} options={barOpt} />
              </div>
            </div>
            <div className="flex flex-col  justify-evenly items-center p-5 h-[425px] ml-2 w-1/2 rounded-md dark:bg-slate-800">
              <div className="pb-8 text-3xl font-semibold dark:text-slate-100">
                Win & Lose
              </div>
              <div className="m-1 w-[2/3]">
                <Doughnut data={pieData} options={pieOpt} />
              </div>
            </div>
          </div>

          <div className="py-14 pb-3 bg-gray-800 rounded-md">
            <div className="grid grid-cols-5 gap-4 justify-items-center items-center py-2 pr-10 dark:bg-gray-700">
              <div className="justify-self-start pl-12">Win/Lose</div>
              <div className="">Profit(ETH)</div>
              <div className="">Spent(ETH)</div>
              <div className="">Revernced(ETH)</div>
              <div className="">ROI(ETH)</div>
            </div>
            <div className="overflow-y-scroll h-[200px] win-lose-data-content">
              {winLoseBoard}
            </div>
            <div className="flex justify-end px-3 pt-3 w-full dark:text-white">
              <Stack spacing={2}>
                <Pagination
                  count={counts}
                  size="large"
                  page={page}
                  onChange={handleChange}
                  className="pagination"
                />
              </Stack>
            </div>
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
