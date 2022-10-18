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
  const handleChange = (e:any, v: any) => {setPage(v)}
  const handleSelectValue = (e:any) => {setLimit(e.target.value)}
  
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
        id={(idx+1).toString()}
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
      <section className='w-full py-5 max-w-[1440px]'>
        <div className='w-[93%] m-auto dark:bg-slate-800 pt-4 rounded-xl'>
          <div className="flex justify-between items-center w-full px-9">
            <div className="font-semibold text-3xl p-10 pb-0 text-gray-200">
              <div className="inline-flex">
                <span className="pr-5">🔥</span>
                <h1>Profit Leaderboard</h1>
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
          <div className="font-normal text-sm pl-20 py-5">
            <p>30Days Avg.profit</p>
          </div>
          <div className="profit-table-container">
            <div className="w-full relative min-w-max">
              <div className="grid grid-cols-5 px-10 py-2 gap-4 justify-items-center dark:bg-gray-700">
                <div className="justify-self-start pl-4" >ENS</div>
                <div className="justify-self-end ">Profit(ETH)</div>
                <div className="justify-self-end ">Revernced(ETH)</div>
                <div className="justify-self-end ">Spent(ETH)</div>
                <div className="justify-self-end ">ROI(ETH)</div>
              </div>
              <div className="rank-content w-full text-left">
                {rankContent}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end dark:text-white p-6" >
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
