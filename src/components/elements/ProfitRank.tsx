import React, { useEffect, useRef, useState } from 'react'
import { Skeleton } from '@mui/material'
import Link from 'next/link'


type RankProps = {
  id: string
  ens: string
  address: string
  revernced: number
  spent: number
  profit: number
  roi: number
  maxSpent: number
  maxRevernced: number
  maxProfit: number
  maxRoi: number
  data: any
}

const ProfitRank = (props: RankProps) => {
  const {
    id,
    ens,
    address,
    revernced,
    spent,
    profit,
    roi,
    maxSpent,
    maxRevernced,
    maxProfit,
    maxRoi,
    data,
  } = props

  const ProfitContent = ({ children, value, max }: any) => {
    const [width, setWidth] = useState(15)
    const remapRange = (value: any, max: any) => {
      return Math.round((value / max) * 80)
    }

    useEffect(() => {
      setWidth(remapRange(value, max))
    }, [value, max])

    return (
      <div className="flex relative justify-end items-center w-full">
        <div className="pr-8">{children}</div>
        <div className="relative h-2 bg-gray-600 rounded-sm w-[80px]">
          <div className="progress-bar" style={{ width: `${width}px` }}></div>
        </div>
      </div>
    )
  }

  const loadingSkeleton = [...new Array(4)].map((_val, idx) => {
    return (
      <div key={idx} className="justify-self-end py-1 w-3/4">
        <Skeleton
          animation="wave"
          className="h-4 dark:bg-gray-600 bg-stone-300"
        />
      </div>
    )
  })

  const traderUrl = `/address/${address}`
  return (
    <Link href={traderUrl}>
      <a aria-label="opensea link" target="_blank" rel="noopener">
        <div
          id={id}
          className="grid relative grid-cols-5 gap-4 justify-items-center items-center pr-10 w-full hover:cursor-pointer"
        >
          {!data ? (
            <>
              <div className="py-3 w-3/4">
                <Skeleton
                  animation="wave"
                  className="h-4 dark:bg-gray-600 bg-stone-300"
                />
              </div>
              {loadingSkeleton}
            </>
          ) : (
            <>
              <div className="sticky left-0 z-50 justify-self-start py-2 pl-10 w-[190px] truncate dark:bg-slate-800">
                {ens}
              </div>
              <ProfitContent value={profit} max={maxProfit}>
                {profit}
              </ProfitContent>
              <ProfitContent value={revernced} max={maxRevernced}>
                {revernced}
              </ProfitContent>
              <ProfitContent value={spent} max={maxSpent}>
                {spent}
              </ProfitContent>
              <ProfitContent value={roi} max={maxRoi}>
                {roi}
              </ProfitContent>
            </>
          )}
        </div>
      </a>
    </Link>
  )
}

export default ProfitRank
