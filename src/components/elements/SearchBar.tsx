import React, { useRef } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

const SearchBar = () => {
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchBoxRef = useRef(null)
  const search: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const query = searchInputRef.current?.value
    if (!query) return
    router.push(`/search?q=${query}`).then(() => router.reload())
  }

  return (
    <form
      className="flex relative items-center w-full"
      onSubmit={search}
      ref={searchBoxRef}
    >
      <input
        ref={searchInputRef}
        type="text"
        className="flex-shrink py-2.5 px-8 w-full font-medium rounded-full transition-all duration-200 ease-in-out dark:bg-gray-800 outline-0 bg-zinc-200 dark:text-slate-200 h-11"
        id="input"
        placeholder="Search..."
        autoComplete="off"
      />
      <button type="submit" className="absolute right-7 w-5">
        <MagnifyingGlassIcon />
      </button>
    </form>
  )
}

export default SearchBar
