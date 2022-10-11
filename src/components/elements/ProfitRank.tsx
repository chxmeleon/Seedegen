import React from 'react'
import useSWR from 'swr'
import Progress from './Progress'



type RankProps = {
  address: string
  revernced: string
  spent: string
  profit: string
  profitPercent: string
}


const ProfitRank = (props: RankProps) => {
  const { address, revernced, spent, profit, profitPercent } = props

  const remap = (value:any, max:any) => {
    return Math.round((value / max) * 80)
  }

  const ProfitContent = ({children, value}:any) => {
    return (
      <div className="inline-flex items-center">
        <div className="pr-9">{children}</div>
        <Progress value={value} />
      </div>

    )
  }
  

  return (
    <div className='w-full px-24 flex justify-around items-center'>
      <div>
        <div>{address}</div>
      </div>
      <ProfitContent value={22}>
        {revernced}
      </ProfitContent>
      <ProfitContent value={22}>
        {spent}
      </ProfitContent>
      <ProfitContent value={22}>
        {profit}
      </ProfitContent>
      <ProfitContent value={22}>
        {profitPercent}
      </ProfitContent>
    </div>
  )
}

export default ProfitRank
