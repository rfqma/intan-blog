'use client'

import { useTheme } from "next-themes"
import { MdDarkMode, MdLightMode } from 'react-icons/md'

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <button
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark')
        }}
      >
        {
          theme === 'dark' ?
            <MdLightMode size={20} />
            :
            <MdDarkMode size={20} />
        }
      </button>
    </>
  )
}