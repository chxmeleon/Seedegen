import ProfitRank from './ProfitRank'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url: any) => axios.get(url).then((res: any) => res.data)

const ProfitLeaderboard = () => {
  const url = 'api/data/gain-rank-30days'
  const ethPriceUrl =
    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'

  const { data: tradeData, error } = useSWR(url, fetcher)
  const { data: ethToUsd } = useSWR(ethPriceUrl, fetcher)
  
  const keyName = ['profit', 'received', 'spent', 'roi']
  const maxValueList = [...new Array(4)].map((_val, idx) => {
    const key = keyName[idx]
    const requestKeyArr = tradeData?.map((data: any) => {
      return data[key]
    })
    return requestKeyArr?.sort((a: number, b: number) => a - b).reverse()[0]
  })

  const rankContent = [...new Array(10)].map((_val, idx) => {
    const allData = tradeData?.[idx]
    const spent = allData?.spent.toFixed(2)
    const revernced = allData?.received.toFixed(2)
    const profit = allData?.profit.toFixed(2)
    const roi = allData?.roi.toFixed(2)
    const maxProfit = maxValueList[0]
    const maxRevernced = maxValueList[1]
    const maxRoi = maxValueList[2]
    const maxSpent = maxValueList[3]
  
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
      <section className='w-full'>
        <div className='w-[93%] m-auto dark:bg-slate-800 py-12 rounded-xl'>
          <div className="font-semibold text-3xl px-10 pb-10 text-gray-200">
            <div className="flex ">
              <span className="pr-5">🚀</span>
              <h1>Profit Leaderboard 30Days</h1>
            </div>
          </div>
          <div className='w-full flex justify-around font-bold text-xl  bg-gray-700 py-3'>
            <div className="">ENS</div>
            <div>Profit</div>
            <div>Revernced</div>
            <div>Spent</div>
            <div>ROI</div>
          </div>
          <ul className='rank-content'>{rankContent}</ul>
        </div>
      </section>
    </>
  )
}
export default ProfitLeaderboard









