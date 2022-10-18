import React, { useEffect, useRef, useState } from 'react'
import { Skeleton } from '@mui/material'

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
    data
  } = props



  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [loading])


  

  const ProfitContent = ({ children, value, max }: any) => {
    const [width, setWidth] = useState(15)
    const remapRange = (value: any, max: any) => {
      setWidth(Math.round((value/ max) * 80)) 
    }

    useEffect(() => {
      remapRange(value, max)
    }, [value, max])

    return (
      <div className='relative w-full flex justify-end items-center'>
        <div className='pr-8'>{children}</div>
        <div className='relative w-[80px] h-2 bg-gray-600 rounded-sm'>
          <div className="progress-bar" style={{ width: `${width}px` }}></div>
        </div>
      </div>
    )
  }

  const loadingSkeleton = [...new Array(5)].map((_val, idx) => {
    return (
      <div key={idx} className="w-1/2 py-1">
        <Skeleton
          animation="wave"
          className="h-4 bg-stone-300 dark:bg-gray-600"
        />
      </div>
    )
  })

  return (
    <div
      id={id}
      className="w-full grid grid-cols-5 px-10 gap-4 justify-items-center py-2" 
    >
    {loading && !data ? 
      <>
        {loadingSkeleton}
      </>
      :
      <>
        <div className="w-[170px] justify-self-start pl-4 truncate">
          {ens}
        </div>
        <ProfitContent value={profit} max={maxProfit}>{profit}</ProfitContent>
        <ProfitContent value={revernced} max={maxRevernced}>
          {revernced}</ProfitContent>
        <ProfitContent value={spent} max={maxSpent}>{spent}</ProfitContent>
        <ProfitContent value={roi} max={maxRoi}>{roi}</ProfitContent>
      </>
    }
    </div>
  )
}

export default ProfitRank
