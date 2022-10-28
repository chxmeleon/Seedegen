import useSWR from 'swr'
import axios from 'axios'
import { useState } from 'react'
import ProfitRank from './ProfitRank'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const fetcher = (url: any) => axios.get(url).then((res: any) => res.data)

const ProfitLeaderboard30D = () => {
  const fullDataUrl = 'api/data/gain-rank-30days?limit=500'
  const { data: tradeData } = useSWR(fullDataUrl, fetcher)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const offset = (page - 1) * 10 ?? 0
  const count = 500 / limit
  const handleChange = (e: any, v: any) => {
    setPage(v)
  }
  const handleSelectValue = (e: any) => {
    setLimit(e.target.value)
  }

  const keyName = ['profit', 'received', 'spent', 'roi']
  const maxValueList = keyName.map((_val, idx) => {
    const requestKeyArr = tradeData?.map((data: any) => {
      return data[keyName[idx]]
    })
    return requestKeyArr?.sort((a: number, b: number) => a - b).reverse()[0]
  })

  const rankContent = [...new Array(Number(limit))].map((_val, idx) => {
    const allData = tradeData?.[idx + offset]
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
        data={tradeData}
      />
    )
  })

  return (
    <>
      <section className="py-5 w-full max-w-[1440px]">
        <div className="transition-all duration-300 ease-in-out w-[93%] m-auto bg-neutral-100 drop-shadow-md border border-gray-200 dark:border-gray-800 dark:bg-slate-800 pt-4 rounded-xl">
          <div className="flex justify-between items-center px-9 w-full">
            <div className="py-10 text-3xl font-semibold dark:text-gray-200">
              <div className="inline-flex">
                <span className="pr-5">🔥</span>
                <h1>Profit Leaderboard 30days</h1>
              </div>
            </div>
            <select
              onChange={handleSelectValue}
              value={limit}
              className="flex justify-start items-center p-2 rounded-md dark:bg-gray-700 w-[80px]"
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="profit-table-container">
            <div className="relative w-full min-w-max">
              <div className="grid relative grid-cols-5 gap-4 justify-items-center items-center pr-10 dark:bg-gray-700">
                <div className="sticky left-0 z-50 justify-self-start py-2 pl-10 w-full dark:bg-gray-700">
                  ENS
                </div>
                <div className="justify-self-end">Profit(ETH)</div>
                <div className="justify-self-end">Revernced(ETH)</div>
                <div className="justify-self-end">Spent(ETH)</div>
                <div className="justify-self-end">ROI(ETH)</div>
              </div>
              <div className="w-full text-left rank-content">{rankContent}</div>
            </div>
          </div>
          <div className="flex justify-end p-6 w-full dark:text-white">
            <Stack spacing={2}>
              <Pagination
                count={count}
                size="large"
                page={page}
                onChange={handleChange}
                className="pagination"
              />
            </Stack>
          </div>
        </div>
      </section>
    </>
  )
}
export default ProfitLeaderboard30D
