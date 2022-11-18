import { ChangeEvent, useState } from 'react'
import ProfitRank from './ProfitRank'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

type DataRow = {
  ens: string
  spent: number
  received: number
  profit: number
  roi: number
  address: string
}

type ProfitLeaderboardProps<T> = {
  tradeData: T[]
}

const ProfitLeaderboard: React.FC<ProfitLeaderboardProps<DataRow>> = ({
  tradeData,
}) => {
  const isAllData = tradeData?.length > 500
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const offset = (page - 1) * 10 ?? 0
  const count = tradeData?.length / limit
  const handleChange = (e: ChangeEvent<unknown>, n: number) => {
    setPage(n)
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

  
  const rankContent = tradeData?.slice(offset, offset + limit).map((data, idx) => {
    const spent = data?.spent
    const revernced = data?.received
    const profit = data?.profit
    const roi = data?.roi
    const maxProfit = maxValueList[0]
    const maxRevernced = maxValueList[1]
    const maxSpent = maxValueList[2]
    const maxRoi = maxValueList[3]
    const address = data?.address
    

    return (
      <ProfitRank
        key={idx.toString()}
        id={(idx + 1).toString()}
        ens={data?.ens}
        address={address?.toString()}
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
    <section className="py-5 w-full max-w-[1440px]">
      <div className="w-[93%] m-auto dark:bg-slate-800 pt-4 rounded-xl">
        <div className="flex justify-between items-center px-9 w-full">
          <div className="py-10 text-3xl font-semibold dark:text-gray-200">
            <div className="inline-flex">
              {isAllData ? (
                <>
                  <span className="pr-5">🚀</span>
                  <h1>Profit Leaderboard</h1>
                </>
              ) : (
                <>
                  <span className="pr-5">🔥</span>
                  <h1>Profit Leaderboard 30days</h1>
                </>
              )}
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
            <div className="grid grid-cols-5 gap-4 justify-items-center items-center pr-10 dark:bg-gray-700">
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
  )
}
export default ProfitLeaderboard
