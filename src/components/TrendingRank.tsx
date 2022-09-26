import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Skeleton } from '@mui/material'
import useSWR from 'swr'
import tw from 'twin.macro'

type TrendingProps = {
  avatarHerf?: any
  name: any
  floorPrice: string
  volumes: string
  linkHref?: any
  sales: string
  marketCap: string
  averagePrice: string
  id: string
  offset: number
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json())

function TrendingRank(props: TrendingProps) {
  const {
    avatarHerf,
    name,
    floorPrice,
    volumes,
    linkHref,
    sales,
    marketCap,
    averagePrice,
    id,
    offset,
  } = props

  const SkeletonContainer = tw.div`w-full py-2 border-t-[0.5px] border-t-gray-600 flex justify-start items-center`
  const TendingContainer = tw.div`w-full py-2 border-t-[0.5px] border-t-gray-600 flex justify-start items-center hover:bg-slate-200 dark:hover:bg-gray-800`
  const PriceContainer = tw.div`w-full flex justify-end text-center`
  const PriceContent = tw.div`w-1/5 [> p]:font-bold`

  const DataContent = ({ children }: any) => {
    return (
      <PriceContent>
        <p>{children}</p>
      </PriceContent>
    )
  }

  const apiUrl =
    'https://api.nftgo.io/api/v2/ranking/collections?offset=' +
    offset +
    '&limit=100&by=volume7d&asc=-1&rarity=-1&keyword=&fields=marketCap,marketCapRanking,marketCapChange7d,buyerNum7d,buyerNum7dChange7d,sellerNum7d,sellerNum7dChange7d,liquidity7d,liquidity7dChange7d,saleNum7d,saleNum7dChange7d,volume7d,volume7dChange7d,traderNum7d,traderNum7dChange7d,holderNum,holderNumChange7d,whaleNum,whaleNumChange7d,orderAvgPriceETH7d,orderAvgPriceETH7dChange7d,orderAvgPrice7d,orderAvgPrice7dChange7d,floorPrice,floorPriceChange7d,blueChipHolderNum,blueChipHolderNumChange7d,blueChipHolderRatio,whaleRatio'
  const { data: trendingData } = useSWR(apiUrl, fetcher)

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1100)
  }, [loading])

  const rankIndex = offset + Number(id) + 1

  return (
    <li id={id}>
      {loading || !trendingData ? (
        <SkeletonContainer>
          <div className="w-[490px] px-6 flex items-center">
            <div className="w-8 text-right pr-1">
              <p>{rankIndex}</p>
            </div>
            <div className="px-7 flex justify-center items-center">
              <Skeleton
                animation="wave"
                variant="circular" width={56} height={56}
                className="bg-stone-300 dark:bg-gray-600"
              />
            </div>
            <div className="w-[187px]">
              <Skeleton
                animation="wave"
                className="h-8 bg-stone-300 dark:bg-gray-600"
              />
            </div>
          </div>
          <div className="right-rank-container">
            <div className="right-rank-content">
              <Skeleton animation="wave" className="rank-skeleton" />
            </div>
            <div className="right-rank-content">
              <Skeleton animation="wave" className="rank-skeleton" />
            </div>
            <div className="right-rank-content">
              <Skeleton animation="wave" className="rank-skeleton" />
            </div>
            <div className="right-rank-content">
              <Skeleton animation="wave" className="rank-skeleton" />
            </div>
            <div className="right-rank-content">
              <Skeleton animation="wave" className="rank-skeleton" />
            </div>
          </div>
        </SkeletonContainer>
      ) : (
        <Link href={linkHref}>
          <a aria-label="opensea link" target="_blank" rel="noopener">
            <TendingContainer>
              <div className="w-[490px] px-6 flex items-center">
                <div className="w-8 text-right">
                  <p>{rankIndex}</p>
                </div>
                <div className="px-7 flex justify-center items-center">
                  <Image
                    src={avatarHerf}
                    alt="avatar image"
                    width={64}
                    height={64}
                    className="overflow-hidden rounded-full"
                  />
                </div>
                <div className="w-[243px] whitespace-pre-wrap truncate">
                  <p>{name}</p>
                </div>
              </div>
              <PriceContainer>
                <DataContent>{Number(floorPrice).toFixed(2)} ETH</DataContent>
                <DataContent>{volumes} ETH</DataContent>
                <DataContent>{sales}</DataContent>
                <DataContent>{marketCap} ETH</DataContent>
                <DataContent>{averagePrice} ETH</DataContent>
              </PriceContainer>
            </TendingContainer>
          </a>
        </Link>
      )}
    </li>
  )
}

export default TrendingRank
