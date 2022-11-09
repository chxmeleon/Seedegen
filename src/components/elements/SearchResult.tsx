import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { number } from 'yup'
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ArrowUpOnSquareIcon,
  BookmarkIcon,
  EllipsisHorizontalCircleIcon,
} from '@heroicons/react/24/outline'

const SearchResult = ({ results }: any) => {
  console.log(results?.[0])

  return (
    <section className="flex items-center w-full">
      <div className="m-auto w-full max-w-[1300px] ">
        <div className="w-[45%] ml-[20%]">
          {results?.map((result: any, idx: number) => (
            <li
              className="p-6 py-8 list-none my-4 dark:bg-slate-800/50"
              key={idx}
            >
              <div className="flex justify-between items-start">
                <div className="inline-flex items-center">
                  <div className="flex overflow-hidden w-16 h-16 bg-amber-50 rounded-full">
                    <span className="m-auto text-5xl font-bold text-zinc-600"></span>
                  </div>
                  <a
                    href={result.walletEtherscanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h1 className="pl-8 text-2xl font-semibold">
                      {result.walletAddress.slice(0, 4) +
                        '...' +
                        result.walletAddress.slice(-4)}
                    </h1>
                  </a>
                </div>
                <EllipsisHorizontalCircleIcon className="w-7" />
              </div>
              <div className="pb-5 pt-10 px-1">
                <p>Buy</p>
                <p>{result.cost}</p>
              </div>
              <div className="inline-flex justify-between items-center pt-9 w-full">
                <div className="inline-flex justify-between items-center w-1/3">
                  <ChatBubbleLeftIcon className="w-7" />
                  <HeartIcon className="w-7" />
                  <ArrowUpOnSquareIcon className="w-7" />
                </div>
                <BookmarkIcon className="w-7" />
              </div>
            </li>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SearchResult
