import React from 'react'
import useSWR from 'swr'
import { number } from 'yup'
import Progress from './Progress'



type RankProps = {
  id: string
  ens: string
  address: string
  revernced: number 
  spent: number
  profit: number
  roi: number
}


const ProfitRank = (props: RankProps) => {
  const { id, ens, address, revernced, spent, profit, roi } = props

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
    <div id={id} className='w-full px-24 flex justify-around items-center'>
      <div>
        <div>{ens}</div>
      </div>
      {/* <div> */}
      {/*   <div>{address}</div> */}
      {/* </div> */}
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
        {roi}
      </ProfitContent>
    </div>
  )
}

export default ProfitRank
