import React from 'react'
import Progress from './Progress'

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

  const remap = (value: any, max: any) => {
    return Math.round((value / max) * 80)
  }

  const ProfitContent = ({ children, value }: any) => {
    return (
      <div className='w-[92%] flex justify-end items-center'>
        <div className='pr-7'>{children}</div>
        <Progress value={value} />
      </div>
    )
  }

  return (
    <li
      id={id}
      className='w-full grid grid-cols-5 gap-3 justify-items-start  px-20 py-3'
    >
      <div>
        <p>{ens}</p>
      </div>
      <ProfitContent value={remap(profit, maxProfit)}>{profit}</ProfitContent>
      <ProfitContent value={remap(revernced, maxRevernced)}>
        {revernced}
      </ProfitContent>
      <ProfitContent value={remap(spent, maxSpent)}>{spent}</ProfitContent>
      <ProfitContent value={remap(roi, maxRoi)}>{roi}</ProfitContent>
    </li>
  )
}

export default ProfitRank
