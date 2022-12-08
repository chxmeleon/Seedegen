import Link from 'next/link'
import React from 'react'

const Lside = () => {
  return (
    <div className="relative w-1/3">
      <div className="flex justify-end pt-10 w-full h-screen pr-32">
        <div className="fixed flex flex-col justify-around h-1/3 text-2xl font-medium">
          <div>
            <Link href="/">
              <a aria-label="News page link">
                <p>Home</p>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/analytics">
              <a aria-label="News page link">
                <p>Analytics</p>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/trending">
              <a aria-label="News page link">
                <p>Trending</p>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/discover">
              <a aria-label="News page link">
                <p>Discover</p>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/">
              <a aria-label="News page link">
                <p>Whatchlist</p>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lside
