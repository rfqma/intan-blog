'use client'

import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { menuItems } from "@/lib/utilities/data"
import { HeaderMenuItem } from "@/lib/utilities/types"
import { Button } from "../../Button"
import { ThemeToggler } from "../../ThemeToggler"
import { signIn, signOut, useSession } from 'next-auth/react'
import { GoogleButton } from "@/components/GoogleButton"
import { usePathname, useRouter } from "next/navigation"
import { GlobalContext } from "@/lib/contexts"

export const Header = () => {
  const [sticky, setSticky] = useState<boolean>(false)
  const [headerOpen, setHeaderOpen] = useState<boolean>(false)
  const { data: session } = useSession()
  const { setSearchResults, setSearchQuery } = useContext(GlobalContext)
  const router = useRouter()
  const pathName = usePathname()

  const handleStickyHeader = () => {
    if (window.scrollY >= 80) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }

  const handleHeaderToggler = () => {
    setHeaderOpen(!headerOpen)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleStickyHeader)
  })

  useEffect(() => {
    setSearchResults([])
    setSearchQuery('')
  }, [pathName, setSearchQuery, setSearchResults])

  return (
    <>
      <div>
        <header className={`top-0 left-0 z-40 flex w-full items-center bg-transparent
        ${sticky ?
            '!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop:blur-sm !transition dark:!bg-primary dark:!bg-opacity-20'
            : 'absolute'
          }`}
        >
          <div className="container">
            <div className="relative flex items-center justify-between -mx-4">
              <div className="max-w-full px-4 w-60 xl:mr-12">
                <Link href={'/'} className={`text-[30px] font-extrabold cursor-pointer block w-full
                ${sticky ?
                    'py-5 lg:py-2'
                    : 'py-8'
                  }`}
                >
                  Our Blog
                </Link>
              </div>
              <div className="flex items-center justify-between w-full px-4">
                <div>
                  <button
                    onClick={handleHeaderToggler}
                    id="headerToggler"
                    aria-label="Mobile Menu"
                    className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                  >
                    <span
                      className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white
                      ${headerOpen ?
                          'top-[7px] rotate-45'
                          : ''
                        }`}
                    />
                    <span
                      className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white
                      ${headerOpen ?
                          'opacity-0'
                          : ''
                        }`}
                    />
                    <span
                      className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white
                      ${headerOpen ?
                          'top-[-8px] -rotate-45'
                          : ''
                        }`}
                    />
                  </button>
                  <nav
                    id="headerCollapse"
                    className={`absolute right-0 z-30 w-[250px] rounded border-[0.5px] bg-white border-body-color/50 
                      py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none 
                      lg:!bg-transparent lg:p-0 lg:opacity-100
                      ${headerOpen ?
                        'visible top-full opacity-100'
                        : 'invisible top-[120%] opacity-0'
                      }`}
                  >
                    <ul className="block lg:flex lg:space-x-12 list-none">
                      {
                        menuItems.map((menuItem: HeaderMenuItem) => (
                          <li
                            key={menuItem.id}
                            className="relative group"
                          >
                            <Link
                              href={menuItem.path}
                              className={`flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                            >
                              {menuItem.label}
                            </Link>
                          </li>
                        ))
                      }
                      <div className="flex flex-col lg:hidden gap-4 mt-10">
                        <div className="flex items-center gap-3">
                          <ThemeToggler />
                        </div>
                        {
                          session !== null ?
                            <div>
                              <Button onClick={() => router.push('/create')} text="Create Post" />
                            </div>
                            :
                            null
                        }

                        {
                          session !== null ?
                            <div>
                              <Button onClick={() => signOut()} text="Logout" />
                            </div>
                            :
                            <div>
                              <GoogleButton onClick={() => signIn('google')} text="Sign in with Google" />
                            </div>
                        }
                      </div>
                    </ul>
                  </nav>
                </div>
                <div
                  className="items-center justify-end gap-4 pr-16 lg:pr-0 hidden lg:flex"
                >
                  {
                    session !== null ?
                      <Button onClick={() => router.push('/create')} text="Create Post" />
                      :
                      null
                  }

                  {
                    session !== null ?
                      <Button onClick={() => signOut()} text="Logout" />
                      :
                      <GoogleButton onClick={() => signIn('google')} text="Sign in with Google" />
                  }
                  <div className="flex items-center gap-3">
                    <ThemeToggler />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header >
      </div >
    </>
  )
}