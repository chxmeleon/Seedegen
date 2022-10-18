import React from 'react'
import type {
  NextPage,
  NextApiRequest,
  NextApiResponse,
  GetServerSideProps,
} from 'next'
import { useState } from 'react'
import ProfitRank from '../components/elements/ProfitRankSSR'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import prisma from '../lib/prisma'
import Layout from '../components/layouts/Layout'


const Test: NextPage = ({ tradeData }: any) => {
  const [page, setPage] = useState(1)
  const handleChange = (e: any, v: any) => {
    setPage(v)
  }

  const offset = (page - 1) * 10 ?? 0
  const [limit, setLimit] = useState(10)
  const count = 500 / limit
  const handleSelectValue = (e: any) => {
    setLimit(e.target.value)
  }

  const currentData = tradeData.slice(0 + offset, Number(offset) + Number(limit))

  const keyName = ['profit', 'received', 'spent', 'roi']
  const maxValueList = keyName.map((_val, idx) => {
    const requestKeyArr = tradeData?.map((data: any) => {
      return data[keyName[idx]]
    })
    return requestKeyArr?.sort((a: number, b: number) => a - b).reverse()[0]
  })

  const rankContent = currentData.map((_val:any, idx:any) => {
    const allData = currentData?.[idx]
    const spent = allData?.spent.toFixed(2)
    const revernced = allData?.received.toFixed(2)
    const profit = allData?.profit.toFixed(2)
    const roi = allData?.roi.toFixed(2)
    const maxProfit = maxValueList[0]
    const maxRevernced = maxValueList[1]
    const maxSpent = maxValueList[2]
    const maxRoi = maxValueList[3]

    return (
      <ProfitRank
        key={idx.toString()}
        id={(idx + 1).toString()}
        ens={allData?.ens}
        address={allData?.address}
        spent={spent}
        revernced={revernced}
        profit={profit}
        roi={roi}
        maxSpent={maxSpent}
        maxRevernced={maxRevernced}
        maxProfit={maxProfit}
        maxRoi={maxRoi}
      />
    )
  })

  return (
    <Layout>
      <section className='w-full pt-32 pb-8 px-4 max-w-[1440px] m-auto'>
        <div className='w-[93%] m-auto dark:bg-slate-800 py-10 rounded-xl'>
          <div className="flex justify-between items-center w-full px-9">
            <div className='font-semibold text-3xl py-10 text-gray-200'>
              <div className='inline-flex'>
                <span className='pr-5'>🚀</span>
                <h1>Profit Leaderboard 30Days</h1>
              </div>
            </div>
            <select
              onChange={handleSelectValue}
              value={limit}
              className='w-[80px] p-2  dark:bg-gray-700 flex justify-start items-center rounded-md'
            >
              <option value='10'>10</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select>
          </div>
          <div className='profit-table-container'>
            <div className='w-full relative min-w-max'>
              <div className='grid grid-cols-5 dark:bg-gray-700 py-2 justify-items-center'>
                <div>ENS</div>
                <div>Profit</div>
                <div>Revernced</div>
                <div>Spent</div>
                <div>ROI</div>
              </div>
              <div className='rank-content w-full text-left'>
                {rankContent}
              </div>
            </div>
          </div>
          <div className='m-auto w-full flex justify-between items-center px-8 pt-5'>
            <div className='w-full flex justify-end dark:text-white'>
              <Stack spacing={2}>
                <Pagination
                  count={count}
                  size='large'
                  page={page}
                  onChange={handleChange}
                  className='pagination'
                />
              </Stack>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (req: NextApiRequest, res: NextApiResponse) => {
  const offset = Number(req.query.offset) || 0
  const limit = Number(req.query.limit) || 500
  const rank30days = await prisma.nftProfitLeaderboard30days.findMany({
    skip: offset,
    take: limit,
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
  return {
    props: { tradeData: JSON.parse(JSON.stringify(rank30days)) },
  }
}

export default Test
