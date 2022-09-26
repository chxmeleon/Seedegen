import Link from 'next/link'
import React from 'react'
import ThemeSwitcher from './ThemeSwitch'
import { WalletIcon } from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <div className="w-full flex justify-between items-center p-8">
      <div className="text-3xl">logo</div>
      <div className="w-1/3 flex justify-around items-center">
        <Link href="/Trending" >
          <a aria-label="News page link" >
            <p>Trending</p>
          </a>
        </Link>
        <Link href="/Discover" >
          <a aria-label="News page link" >
            <p>Discover</p>
          </a>
        </Link>
        <Link href="/Analytics" >
          <a aria-label="News page link" >
            <p>Analytics</p>
          </a>
        </Link>
        <ThemeSwitcher />
        <WalletIcon className="w-8 dark:text-gray-50" />
      </div>
    </div>
  )
}
