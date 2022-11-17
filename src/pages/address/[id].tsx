import React, { useState } from 'react'
import prisma from '../../lib/prisma'
import { GetServerSideProps } from 'next'
import Layout from '../../components/layouts/Layout'
import { Bar, Doughnut } from 'react-chartjs-2'
import tw from 'twin.macro'
import useSWR from 'swr'
import axios from 'axios'
import Link from 'next/link'
import WinAndLoseForm from '../../components/elements/WinAndLoseForm'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'
import { CheckIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'
const collections = require('../../config/project')

const fetcher = (url: any) => axios.get(url).then((res: any) => res.data)

const Trader = (props: any) => {
  const { winLoseData, rankMergeData } = props
  const rankData = rankMergeData?.[0]
  const router = useRouter()
  const queryOffset = router.query.offset

  const etherscanUrl = winLoseData?.[0]?.walletEtherscanUrl
  const openseaUrl = winLoseData?.[0]?.walletOpenseaUrl
  const ens = rankData?.ens
  const totalProfit = rankData?.profit.toFixed(2)
  const totalSpent = rankData?.spent.toFixed(2)
  const totalReceived = rankData?.received.toFixed(2)
  const totalRoi = rankData?.roi.toFixed(2)
  const avatarText = ens?.slice(0, 1).toUpperCase()
  const address = winLoseData?.[0]?.walletAddress.toString()
  const shortAddress = address?.slice(0, 4) + '...' + address?.slice(-4)
  const statusArray = winLoseData.map((item: any) => item.status.toLowerCase())
  const winCounts = statusArray.filter(
    (value: string) => value === 'win'
  ).length
  const loseCounts = winLoseData.length - winCounts

  const [page, setPage] = useState(1)
  const offset = (page - 1) * 10 ?? 0
  const counts = Math.ceil(winLoseData.length / 10)

  const handleChange = (e: React.ChangeEvent<unknown>, n: number) => {
    setPage(n)
  }

  const [isCopy, setIsCopy] = useState(false)
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleAddressCopy = () => {
    copyToClipboard(address)
    setIsCopy(true)
    setTimeout(() => {
      setIsCopy(false)
    }, 450)
  }



  const currentPage = winLoseData?.slice(offset, 10 + offset)

  const winLoseBoard = currentPage.map((data: any, idx: any) => {
    const status = data?.status.toLowerCase()
    const transMode = status === 'win' ? '🏆 Win' : '💸 Lose'
    const spent = data?.cost
    const revernced = data?.got
    const profit = data?.net
    const buyTxHashUrl = data?.buyTxHashUrl
    const sellTxHashUrl = data?.sellTxHashUrl
    const tokenId = data?.tokenId
    const project = data?.projectAddress
    const defaultProjectName = `${project.slice(0, 4)}...${project.slice(-4)}`
    const projectName =
      collections.find((item: any) => item.address === project)?.project ??
      defaultProjectName

    return (
      <WinAndLoseForm
        key={idx.toString()}
        id={'winlose-' + idx.toString()}
        spent={spent}
        revernced={revernced}
        status={transMode}
        profit={profit}
        spentTxHashUrl={buyTxHashUrl}
        recerncedTxHashUrl={sellTxHashUrl}
        project={projectName}
        tokenId={tokenId}
      />
    )
  })

  const pieOpt = {
    plugins: {
      legend: { display: false },
    },
  }

  const pieData = {
    labels: ['Lose', 'Win'],
    datasets: [
      {
        data: [loseCounts, winCounts],
        backgroundColor: ['#3b82f6', '#fbbf24'],
        hoverBackgroundColor: ['#3b82f6', '#fbbf24'],
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
    labels: ['Total Profit', 'Total Spent', 'Total Received', 'Gas Spent'],
    datasets: [
      {
        data: [totalProfit, totalSpent, totalReceived, totalSpent / 10],
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
        <div className="py-24 px-16 mx-auto w-full max-w-[1300px]">
          <div className="flex justify-between items-center py-5">
            <div className="flex justify-between items-center mr-4 rounded-lg h-[250px] dark:bg-slate-800">
              <div className="px-12">
                <div className="flex justify-between">
                  <div className="flex overflow-hidden w-20 h-20 bg-amber-50 rounded-full">
                    <span className="m-auto text-5xl font-bold text-zinc-600">
                      {avatarText}
                    </span>
                  </div>
                  <div>
                    <Link href={openseaUrl}>
                      <a
                        aria-label="trader opensea link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div>opensea</div>
                      </a>
                    </Link>
                    <Link href={etherscanUrl}>
                      <a
                        aria-label="trader etherscan link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div>etherscan</div>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="w-96">
                  <div className="flex justify-start items-center pt-5 pb-1 w-full">
                    <h1 className="w-[45%] text-3xl font-medium truncate">
                      {shortAddress}
                    </h1>
                    <div className="">
                      <button
                        className="flex w-8 h-8 bg-gray-600 rounded-full active:bg-cyan-600 hover:bg-zinc-500"
                        onClick={handleAddressCopy}
                      >
                        {isCopy ? (
                          <CheckIcon className="m-auto w-5" />
                        ) : (
                          <ClipboardDocumentIcon className="m-auto w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>{ens}</div>
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
                  <p>{totalSpent / 10} ETH</p>
                </div>
              </DashContainer>
            </div>
          </div>
          <div className="flex justify-between items-center pb-6 w-full">
            <div className="flex flex-col items-center p-2 py-2.5 mr-2 w-2/3 rounded-md h-[425px] dark:bg-slate-800">
              <div className="py-4 text-3xl font-semibold dark:text-slate-100">
                Data Bar Chart
              </div>
              <div className="p-4 w-full">
                <Bar data={barData} options={barOpt} />
              </div>
            </div>
            <div className="flex flex-col justify-evenly items-center p-5 ml-2 w-1/2 rounded-md h-[425px] dark:bg-slate-800">
              <div className="pb-8 text-3xl font-semibold dark:text-slate-100">
                Win & Lose
              </div>
              <div className="m-1 w-[230px]">
                <Doughnut data={pieData} options={pieOpt} />
              </div>
            </div>
          </div>

          <div className="py-14 pb-3 bg-gray-800 rounded-md">
            <div className="grid grid-cols-7 gap-4 justify-items-center items-center py-2 pr-10 dark:bg-gray-700">
              <div className="justify-self-start pl-12">Win/Lose</div>
              <div className="">Project</div>
              <div className="">tokenID</div>
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
    // take: limit,
    // skip: offset,
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
