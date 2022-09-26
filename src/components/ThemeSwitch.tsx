import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

const ThemeSwitcher = () => {

  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const toggle = mounted && (theme === 'dark' || resolvedTheme === 'dark')
  const handleTheme = () => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')
  
  useEffect(() => {setMounted(true)}, [])

  return (
    <div className="inline-flex items-center p-1 rounded-full">
      <button
        onClick={handleTheme}
      >
        {toggle ? 
          <SunIcon className="w-8 hover:text-teal-500" />
        :
          <MoonIcon className="w-8 hover:text-teal-600" />
        }
      </button>
    </div>
  )
}

export default ThemeSwitcher
