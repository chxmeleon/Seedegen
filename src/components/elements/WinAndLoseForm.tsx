import React, { useEffect, useRef, useState } from 'react'
import { Skeleton } from '@mui/material'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

type FormProps = {
  id: string
  spent: number
  revernced: number
  profit: number
  status: string
  spentTxHashUrl: string
  recerncedTxHashUrl: string
  project: string
  tokenId: string
}

const WinAndLoseForm = (props: FormProps) => {
  const {
    id,
    spent,
    revernced,
    profit,
    status,
    spentTxHashUrl,
    recerncedTxHashUrl,
    project,
    tokenId
  } = props

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

  const roi = profit / spent

  return (
    <div
      id={id}
      className="grid relative grid-cols-7 gap-4 py-[6px] justify-items-center items-center pr-10 w-full"
    > 
      <div className="justify-self-start pl-12">
        {status}
      </div>
      <div className="truncate w-[90%]">{project}</div>
      <div>{tokenId}</div>
      <div>{profit.toFixed(4)}</div>
      <div className="inline-flex items-center">
        <div>{spent.toFixed(4)}</div>
        <div className="px-2 w-full">
          <Link href={spentTxHashUrl}>
            <a target="_blank" rel="noopener"  >
              <ArrowUpRightIcon className="w-4" />
            </a>
          </Link>
        </div>
      </div>
      <div className="inline-flex items-center">
        <div>{revernced.toFixed(4)}</div>
        <div className="px-2 w-full">
          <Link href={recerncedTxHashUrl}>
            <a target="_blank" rel="noopener">
              <ArrowUpRightIcon className="w-4" />
            </a>
          </Link>
        </div>
      </div>
      <div>{roi.toFixed(4)}</div>
    </div>
  )
}

export default WinAndLoseForm
