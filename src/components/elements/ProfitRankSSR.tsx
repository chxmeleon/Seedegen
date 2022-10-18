import React, { useEffect, useState } from 'react'

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
  } = props



  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1100)
  }, [loading])


  const ProfitContent = ({ children, value, max }: any) => {
    const remapRange = (value: any, max: any) => {
      return Math.round((value / max) * 80)
    }
    return (
      <div className='relative w-full flex justify-end items-center'>
        <div className='pr-8'>{children}</div>
        <div className='relative w-[80px] h-2 bg-gray-600 rounded-sm'>
          <div className="progress-bar" style={{ width: `${remapRange(value, max)}px` }}></div>
        </div>
      </div>
    )
  }


  return (
    <div
      id={id}
      className="w-full grid grid-cols-5 px-16 gap-4 justify-items-center py-2" 
    >
      <div className="justify-self-start pl-4">
        {ens}
      </div>
      <ProfitContent value={profit} max={maxProfit}>{profit}</ProfitContent>
      <ProfitContent value={revernced} max={maxRevernced}>
        {revernced}
      </ProfitContent>
      <ProfitContent value={spent} max={maxSpent}>{spent}</ProfitContent>
      <ProfitContent value={roi} max={maxRoi}>{roi}</ProfitContent>
    </div>
  )
}

export default ProfitRank
