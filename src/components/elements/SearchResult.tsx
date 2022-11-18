import React from 'react'
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ArrowUpOnSquareIcon,
  BookmarkIcon,
  EllipsisHorizontalCircleIcon,
} from '@heroicons/react/24/outline'
const collections = require('../../config/project')
import OptimizeImage from '../elements/OptimizeImage'

type SearchProps = {
  results: any
}

const SearchResult = (props: SearchProps) => {
  const { results } = props
  return (
    <>
      {results?.map((result: any, idx: number) => {
        const project = result?.projectAddress
        const defaultProjectName = `${project?.slice(0, 4)}...${project?.slice(
          -4
        )}`
        const projectName =
          collections.find((item: any) => item.address === project)?.project ??
          defaultProjectName
        const imageSrc = `https://storage.googleapis.com/nftimagebucket/tokens/${result.projectAddress}/preview/${result.tokenId}.png`
        return (
          <li
            className="p-6 py-8 my-4 list-none dark:bg-slate-800/50"
            key={idx}
          >
            <div className="flex justify-between items-start">
              <div className="inline-flex items-center w-full">
                <div className="flex overflow-hidden w-16 h-16 bg-amber-50 rounded-full">
                  <span className="m-auto text-5xl font-bold text-zinc-600"></span>
                </div>
                <a
                  href={`/address/${result?.walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h1 className="pl-8 text-2xl font-semibold">
                    {result?.walletAddress?.slice(0, 4) +
                      '...' +
                      result?.walletAddress?.slice(-4)}
                  </h1>
                </a>
              </div>
              <EllipsisHorizontalCircleIcon className="w-7" />
            </div>
            <div className="px-1 pt-10 pb-5">
              {Object.keys(result).find((keys) => keys === 'cost') ===
              'cost' ? (
                <>
                  <p className="pb-6">{projectName}</p>
                  <div className="pb-6">
                    <OptimizeImage src={imageSrc} alt="nft image" />
                  </div>
                  <div className="flex justify-between pb-4 w-full font-semibold">
                    <p>Buy</p>
                    <p>{result.buyTime}</p>
                  </div>
                  <div className="flex pb-2">
                    <p className="pr-2">Price: </p>
                    <p className="font-medium">{result.cost} ETH</p>
                  </div>
                  <div className="flex">
                    <p className="pr-2">Token ID:</p>
                    <a
                      href={result.buyTxHashUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="font-medium">{result.tokenId}</p>
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <p className="pb-6">{projectName}</p>
                  <div className="pb-6">
                    <OptimizeImage src={imageSrc} alt="nft image" />
                  </div>
                  <div className="flex justify-between pb-4 w-full font-semibold">
                    <p>Sell</p>
                    <p>{result.sellTime}</p>
                  </div>
                  <div className="flex pb-2">
                    <p className="pr-2">Price: </p>
                    <p className="font-medium">{result.got} ETH</p>
                  </div>
                  <div className="flex">
                    <p className="pr-2">Token ID:</p>
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
        )
      })}
    </>
  )
}

export default SearchResult
