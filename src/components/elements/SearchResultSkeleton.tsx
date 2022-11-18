import React from 'react'
import { Skeleton } from '@mui/material'
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ArrowUpOnSquareIcon,
  BookmarkIcon,
  EllipsisHorizontalCircleIcon,
} from '@heroicons/react/24/outline'

const SearchResultSkeleton = () => {
  return (
    <li className="p-6 py-8 my-4 list-none dark:bg-slate-800/50">
      <div className="flex justify-between items-start">
        <div className="flex justify-start items-center w-full">
          <Skeleton
            animation="wave"
            variant="circular"
            className="dark:bg-gray-600 bg-stone-300"
            width={75}
            height={75}
          />
          <Skeleton
            animation="wave"
            variant="text"
            className="ml-10 w-1/2 dark:bg-gray-600 bg-stone-300"
            height={50}
          />
        </div>
        <EllipsisHorizontalCircleIcon className="w-7" />
      </div>
      <div className="px-1 pt-6 pb-5">
        <Skeleton
          animation="wave"
          variant="rectangular"
          className="mb-3 h-5 rounded-sm dark:bg-gray-600 bg-stone-300"
          height={100}
        />
        <Skeleton
          animation="wave"
          variant="text"
          className="w-1/2 h-5 dark:bg-gray-600 bg-stone-300"
          height={30}
        />
        <Skeleton
          animation="wave"
          variant="text"
          className="h-5 dark:bg-gray-600 bg-stone-300"
          height={30}
        />
        <Skeleton
          animation="wave"
          variant="text"
          className="h-5 dark:bg-gray-600 bg-stone-300"
          height={30}
        />
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
}

export default SearchResultSkeleton
