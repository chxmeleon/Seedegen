import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import ProfitRank from './ProfitRank'

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json())

const ProfitLeaderboard = () => {
  const url =
    'https://bigdata-api.whatscoin.com/smartmoney/nft/profitLeaderboard?label=all&chainId=1'
  const ethPriceUrl =
    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'

  const { data: tradeData } = useSWR(url, fetcher)
  const { data: ethToUsd } = useSWR(ethPriceUrl, fetcher)

  console.log(tradeData)
  console.log(ethToUsd)

  return (
    <ProfitRank
      address='1'
      spent='1'
      revernced='1'
      profit='1'
      profitPercent='100'
    />
  )
}

export default ProfitLeaderboard

