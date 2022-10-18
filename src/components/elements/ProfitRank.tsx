import React from 'react'

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
      <td className='relative w-full flex justify-end items-center'>
        <div className='pr-8'>{children}</div>
        <div className='relative w-[80px] h-2 bg-gray-600 rounded-sm'>
          <div
            className='progress-bar'
            style={{width: `${value}px`, transition: "0s width 1s ease-in-out"}}></div>
        </div>
      </td>
    )
  }

  return (
    <tr
      id={id}
      className="w-full grid grid-cols-5 px-16 gap-4 justify-items-center py-2"
    >
      <td className="justify-self-start">
        {ens}
      </td>
      <ProfitContent value={remap(profit, maxProfit)}>{profit}</ProfitContent>
      <ProfitContent value={remap(revernced, maxRevernced)}>
        {revernced}
      </ProfitContent>
      <ProfitContent value={remap(spent, maxSpent)}>{spent}</ProfitContent>
      <ProfitContent value={remap(roi, maxRoi)}>{roi}</ProfitContent>
    </tr>
  )
}

export default ProfitRank
