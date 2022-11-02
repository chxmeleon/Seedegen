import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const SearchBar = () => {
  return (
    <div className="m-auto w-full text-center">
      <h1 className="pb-12 text-6xl font-semibold">ICU</h1>
      <div className="flex relative justify-center items-center m-auto w-[500px]">
        <input
          type="text"
          className="py-4 px-8 font-medium rounded-full transition-all duration-200 ease-in-out dark:bg-gray-800 outline-0 w-[500px] bg-zinc-200 dark:text-slate-200"
          id="input"
          placeholder="Search..."
          autoComplete="off"
        />
        <button type="submit" className="absolute right-7 w-5">
          <MagnifyingGlassIcon />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
