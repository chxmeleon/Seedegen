import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

const ThemeSwitcher = () => {

  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const toggle = mounted && (theme === 'dark' || resolvedTheme === 'dark')
  const handleTheme = () => {
    setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')
  }
  
  useEffect(() => {
      setMounted(true)
  },[])

  return (
    <div className="inline-flex items-center p-1 rounded-full">
      <button
        onClick={handleTheme}
      >
        <span className="relative inline-block w-12 h-6 rounded-3xl bg-gray-400 dark:bg-blue-400">
          {toggle ? 
            <span className="absolute w-4 h-4 left-1 bottom-1 transition-all ease-in-out duration-[475ms] delay-75 rounded-full translate-x-6 bg-gray-50 active:translate-x-0">
            </span>
          :
            <span className="absolute w-4 h-4 left-1 bottom-1 transition-all ease-in-out duration-[475ms] delay-75 rounded-full translate-x-0 bg-gray-50">
            </span>
          }
        </span>
      </button>
    </div>
  )
}

export default ThemeSwitcher
