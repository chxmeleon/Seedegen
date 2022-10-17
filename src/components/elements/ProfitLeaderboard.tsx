import useSWR from 'swr'
import axios from 'axios'
import { useState } from 'react'
import ProfitRank from './ProfitRank'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { DataGrid } from '@mui/x-data-grid'

const fetcher = (url: any) => axios.get(url).then((res: any) => res.data)

const ProfitLeaderboard = () => {
  const [page, setPage] = useState(1)
  const handleChange = (e: any, v: any) => {
    setPage(v)
  }

  const offset = (page - 1) * 10 ?? 0
  const [limit, setLimit] = useState(10)
  const count = 500 / limit
  const handleSelectValue = (e:any) => {setLimit(e.target.value)}
  const fullDataUrl = 'api/data/gain-rank-30days?limit=500' 
  const filterUrl = 'api/data/gain-rank-30days?limit='+ limit +'&offset=' + offset
  const ethPriceUrl = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'

  const { data: tradeData } = useSWR(fullDataUrl, fetcher)
  const { data: selectedData } = useSWR(filterUrl, fetcher)
  const { data: ethToUsd } = useSWR(ethPriceUrl, fetcher)
  
  const keyName = ['profit', 'received', 'spent', 'roi']
  const maxValueList = [...new Array(4)].map((_val, idx) => {
    const key = keyName[idx]
    const requestKeyArr = tradeData?.map((data: any) => {
      return data[key]
    })
    return requestKeyArr?.sort((a: number, b: number) => a - b).reverse()[0]
  })

  const rankContent = [...new Array(Number(limit))].map((_val, idx) => {
    const allData = selectedData?.[idx]
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
        id={idx.toString()}
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
    <>
      <section className='w-full lg:w-5/6'>
        <div className='w-[93%] m-auto dark:bg-slate-800 py-10 rounded-xl'>
          <div className="font-semibold text-3xl p-10 text-gray-200">
            <div className="flex ">
              <span className="pr-5">🚀</span>
              <h1>Profit Leaderboard 30Days</h1>
            </div>
          </div>
          <table  className='w-full'>
            <thead>
              <tr className="w-full grid grid-cols-5 dark:bg-gray-700 py-2">
                <th scope="col">ENS</th>
                <th scope="col">Profit</th>
                <th scope="col">Revernced</th>
                <th scope="col">Spent</th>
                <th scope="col">ROI</th>
              </tr>
            </thead>
            <tbody className="rank-content w-full text-left">
              {rankContent}
            </tbody>
          </table>
          <div className="m-auto w-full flex justify-between items-center px-8 pt-5">
            <select 
              onChange={handleSelectValue} 
              defaultValue={10}
              value={limit}
              className="w-[80px] p-2 dark:bg-gray-700 flex justify-start items-center rounded-md">
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <div className="w-full flex justify-end dark:text-white" >
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
        </div>
      </section>
    </>
  )
}
export default ProfitLeaderboard









