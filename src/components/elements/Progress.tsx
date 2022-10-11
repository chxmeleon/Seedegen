import { width } from '@mui/system'
import React from 'react'

type Props = {
  value: number 
}

const Progress = (props: Props) => {
  const { value } = props

  return (
    <div className="relative w-[80px] h-3 bg-gray-600">
      <span className="absolute h-3 bg-cyan-500" style={{width: `${value}px`}}></span>
    </div>
  )
}

export default Progress
