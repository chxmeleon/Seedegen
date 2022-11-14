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
  return (
    <section className="flex items-center w-full">
      <div className="m-auto w-full max-w-[1300px]">
        <div className="w-[45%] ml-[20%]">
          {results?.map((result: any, idx: number) => (
            <li
              className="p-6 py-8 my-4 list-none dark:bg-slate-800/50"
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
              <div className="px-1 pt-10 pb-5">
                {Object.keys(result).find((keys) => keys === 'cost') ===
                'cost' ? (
                  <>
                    <div className="pb-6">
                      <img
                        src={`https://storage.googleapis.com/nftimagebucket/tokens/${result.projectAddress}/preview/${result.tokenId}.png`}
                        alt="nft image"
                      />
                    </div>
                    <div className="flex justify-between pb-4 w-full font-semibold">
                      <p>Buy</p>
                      <p>{result.buyTime}</p>
                    </div>
                    <p className="font-medium">{result.cost} ETH</p>
                    <a
                      href={result.buyTxHashUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="font-medium">{result.tokenId}</p>
                    </a>
                    <p>{result.projectAddress}</p>
                  </>
                ) : (
                  <>
                    <p className="pb-6">{result.projectAddress}</p>
                    <div className="pb-6">
                      <img
                        src={`https://storage.googleapis.com/nftimagebucket/tokens/${result.projectAddress}/preview/${result.tokenId}.png`}
                        alt="nft image"
                      />
                    </div>
                    <div className="flex justify-between pb-4 w-full font-semibold">
                      <p>Sell</p>
                      <p>{result.sellTime}</p>
                    </div>
                    <div className="flex">
                      <p className="pr-2">Price: </p>
                      <p className="font-medium">{result.got} ETH</p>
                    </div>
                    <div className="flex">
                      <p className="pr-2">Token ID</p>
                      <a
                        href={result.sellTxHashUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="font-medium">{result.tokenId}</p>
                      </a>
                    </div>
                  </>
                )}
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
