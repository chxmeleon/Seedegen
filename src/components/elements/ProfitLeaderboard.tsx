import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import ProfitRank from './ProfitRank'

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json())

const ProfitLeaderboard = () => {
  const url ='api/data/gain-rank-30days'
  const ethPriceUrl =
    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'

  const { data: tradeData } = useSWR(url, fetcher)
  const { data: ethToUsd } = useSWR(ethPriceUrl, fetcher)

  const rankContent = [...new Array(100)].map((_val, idx) => {
    const allData = tradeData?.[idx]
    return (
      <ProfitRank
        key={idx.toString()}
        id={idx.toString()}
        ens={allData?.ens}
        address={allData?.address}
        spent={allData?.spent}
        revernced={allData?.received}
        profit={allData?.profit}
        roi={allData?.roi}
      />
    )
  }) 
    
  return (
    <>
      <div>
        <ul>
          {rankContent}
        </ul>
      </div>
    </>
  )
}

export default ProfitLeaderboard

