import Link from 'next/link'
import React from 'react'
import ThemeSwitcher from '../elements/ThemeSwitch'
import { WalletIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import SearchBar from '../elements/SearchBar'

type HeaderProps = {
  isConnected: boolean
  onClick: any
}

const Header: React.FC<HeaderProps> = (props) => {
  const { isConnected, onClick } = props
  const router = useRouter()

  return (
    <header className="relative">
      <div className="navbar-container">
        <Link href="/">
          <a aria-label="News page link">
            <h1 className="text-2xl font-bold">ICU</h1>
          </a>
        </Link>
        {router.route !== '/' ? (
          <div className="pl-24">
            <SearchBar />
          </div>
        ) : null}
        <ul className="navbar-right">
          <li>
            <Link href="/Analytics">
              <a aria-label="News page link">
                <p>Analytics</p>
              </a>
            </Link>
          </li>
          <li>
            <div className="menu-dropdown">
              <button className="menu-dropdown-btn">Collections</button>
              <div className="menu-dropdown-content">
                <Link href="/Trending">
                  <a aria-label="News page link">
                    <p>Trending</p>
                  </a>
                </Link>
                <Link href="/Discover">
                  <a aria-label="News page link">
                    <p>Discover</p>
                  </a>
                </Link>
              </div>
            </div>
          </li>
          <li>
            <div className="user-dropdown">
              <button className="user-dropdown-btn" onClick={onClick}>
                {isConnected ? (
                  <div className="w-8 h-8 rounded-full bg-amber-400"></div>
                ) : (
                  <UserCircleIcon className="w-8" />
                )}
              </button>
              <div className="user-dropdown-content">
                <Link href="/">
                  <a aria-label="user link">
                    <p>Profile</p>
                  </a>
                </Link>
                <div className="flex justify-center items-center pt-6">
                  <div className="pr-6 pb-2">Darkmode</div>
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
          </li>
          <li className="pt-1.5">
            <button onClick={onClick}>
              <WalletIcon className="w-8 dark:text-gray-50" />
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}
export default Header
