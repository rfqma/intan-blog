'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react"
import { useSession } from "next-auth/react"
import { Spinner } from "@/components/Spinner"
import { Blog, BlogFormData } from "../utilities/types"
import { initialBlogFormData } from "../utilities/data"
import { usePathname, useRouter } from "next/navigation"

type ContextType = {
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>
  postFormData: BlogFormData
  setPostFormData: Dispatch<SetStateAction<BlogFormData>>
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
  searchResults: Blog[]
  setSearchResults: Dispatch<SetStateAction<Blog[]>>
}

const initialState = {
  loading: false,
  setLoading: () => { },
  postFormData: initialBlogFormData,
  setPostFormData: () => { },
  searchQuery: '',
  setSearchQuery: () => { },
  searchResults: [],
  setSearchResults: () => { }
}

export const GlobalContext = createContext<ContextType>(initialState)

export default function GlobalState({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false)
  const [postFormData, setPostFormData] = useState(initialBlogFormData)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Blog[]>([])
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  if (session === undefined) {
    return (
      <>
        <Spinner />
      </>
    )
  }

  if (session === null && pathName === '/create') {
    alert('You must be logged in to create a post!')
    router.push('/')
  }

  return (
    <>
      <GlobalContext.Provider
        value={{
          loading, setLoading,
          postFormData, setPostFormData,
          searchQuery, setSearchQuery,
          searchResults, setSearchResults
        }}
      >
        {children}
      </GlobalContext.Provider>
    </>
  )
}