import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const SearchResult = ({ results }: any) => {
  const [page, setPage] = useState(1)
  const offset = (page - 1) * 10 ?? 0
  const counts = 10

  const handleChange = (e: React.ChangeEvent<unknown>, v: number) => {
    setPage(v)
  }

  return (
    <section className="flex items-center w-full">
      <div className="px-48 max-w-[1300px]">
        <div className="w-2/3">
          {results.news.map((result: any) => (
            <li
              className="px-5 my-4 h-36 list-none rounded-md bg-slate-800"
              key={result.id}
            >
              <div className="py-3">
                <a href={result.link} target="_blank" rel="noopener noreferrer">
                  <p className="w-1/3 text-xs truncate">{result.link}</p>
                </a>
                <a href={result.link} target="_blank" rel="noopener noreferrer">
                  <h1 className="pt-2 pb-3 w-2/3 text-2xl font-semibold truncate">
                    {result.title}
                  </h1>
                </a>
                <p className="pr-3 truncate">{result.slug}</p>
              </div>
            </li>
          ))}
        </div>
        <div className="pt-3 w-full dark:text-white">
          <Stack spacing={2}>
            <Pagination
              count={counts}
              size="large"
              page={page}
              onChange={handleChange}
              className="pagination"
            />
          </Stack>
        </div>
      </div>
    </section>
  )
}

export default SearchResult
