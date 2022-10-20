import useSWR from 'swr'
import TrendingRank from './TrendingRank'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json())


const TrendingRankBoard = () => {
  const [page, setPage] = useState(1)
  const handleChange = (e: any, v: any) => {
    setPage(v)
  }
  const offset = (page - 1) * 100 ?? 0

  const apiUrl =
    'https://api.nftgo.io/api/v2/ranking/collections?offset=' + offset + '&limit=100&by=volume7d&asc=-1&rarity=-1&keyword=&fields=marketCap,marketCapRanking,marketCapChange7d,buyerNum7d,buyerNum7dChange7d,sellerNum7d,sellerNum7dChange7d,liquidity7d,liquidity7dChange7d,saleNum7d,saleNum7dChange7d,volume7d,volume7dChange7d,traderNum7d,traderNum7dChange7d,holderNum,holderNumChange7d,whaleNum,whaleNumChange7d,orderAvgPriceETH7d,orderAvgPriceETH7dChange7d,orderAvgPrice7d,orderAvgPrice7dChange7d,floorPrice,floorPriceChange7d,blueChipHolderNum,blueChipHolderNumChange7d,blueChipHolderRatio,whaleRatio'
  const ethPriceUrl = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'
  const { data: trendingData } = useSWR(apiUrl, fetcher)
  const { data: ethToUsd } = useSWR(ethPriceUrl, fetcher)

  const ethExchange = (usd: any) => {
    return Number((usd / ethToUsd?.USD).toFixed(2))
  }
  
  const formatNumber = (num: number) => {
    return Math.abs(num) > 999 ? 
      `${Math.sign(num) * (Number((Math.abs(num) / 1000).toFixed(1)))}k` 
      : Math.sign(num)*Math.abs(num)
  }
 
  const trendingRankContent = [...new Array(100)].map((_val, idx) => {
    const allData = trendingData?.data?.list[idx]
    const volumes = formatNumber(ethExchange(allData?.volume7d))
    const marketCap = formatNumber(ethExchange(allData?.marketCap?.toFixed(2)))
    const averagePrice = allData?.orderAvgPriceETH7d?.toFixed(2).toString()
    const openseaLink = allData?.openseaLink??toString()
    
    
    return (
      <TrendingRank
        key={idx.toString()}
        id={idx.toString()}
        avatarHerf={allData?.logo}
        offset={offset}
        name={allData?.name}
        floorPrice={allData?.floorPrice?.tokenPrice.toString()}
        volumes={volumes.toString()}
        linkHref={openseaLink}
        sales={allData?.saleNum7d}
        marketCap={marketCap === 0 ? '< 0.001' : marketCap.toString()}
        averagePrice={averagePrice}
      />
    )
  })

  return (
    <>
      <div className="w-full h-[76px] py-16"></div>
      <div className="w-5/6 m-auto">
        <h1 className="text-4xl font-medium tracking-wider px-8 pb-8">
          Trending
        </h1>
      </div>
      <div className="w-5/6 m-auto rounded-md border-[0.5px] border-gray-600">
        <div className="w-full py-5 flex justify-around items-center font-bold text-sm self-center">
          <div className="w-[490px] mx-6">COLLECTION</div>
          <div className="w-full flex justify-end text-center">
            <div className="w-1/5">FLOOR PRICE</div>
            <div className="w-1/5">VOLUMES</div>
            <div className="w-1/5">SALES</div>
            <div className="w-1/5">MARKETCAP</div>
            <div className="w-1/5">AVERAGE PRICE</div>
          </div>
        </div>
        <ul>{trendingRankContent}</ul>
      </div>
      <div className="dark:text-white w-full flex justify-center items-center pt-9" >
        <Stack spacing={2}>
          <Pagination 
            count={10} 
            size="large" 
            page={page} 
            onChange={handleChange}
            onClick={() => {window.scroll(0,0)}}
            className="pagination"
            />
        </Stack>
      </div>
    </>
  )
}

export default TrendingRankBoard
