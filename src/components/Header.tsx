import Link from 'next/link'
import React from 'react'
import ThemeSwitcher from './ThemeSwitch'

export default function Header() {
  return (
    <div className="w-full flex justify-between items-center p-5">
      <div className="text-3xl">logo</div>
      <div className="w-1/3 flex justify-around items-center">
        <Link href="/Trending" >
          <a aria-label="News page link" >
            <p>Trending</p>
          </a>
        </Link>
        <div>Discover</div>
        <ThemeSwitcher />
      </div>
    </div>
  )
}
