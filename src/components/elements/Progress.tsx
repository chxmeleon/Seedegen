import { width } from '@mui/system'
import React from 'react'

type Props = {
  value: number 
}

const Progress = (props: Props) => {
  const { value } = props

  return (
    <div className="relative w-[80px] h-2 bg-gray-600 rounded-sm">
      <span className="absolute h-2 bg-cyan-500 rounded-sm" style={{width: `${value}px`}}></span>
    </div>
  )
}

export default Progress
