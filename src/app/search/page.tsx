'use client'

import { Post } from "@/components/Blog/Post"
import { Button } from "@/components/Button"
import { GlobalContext } from "@/lib/contexts"
import { Blog } from "@/lib/utilities/types"
import { ChangeEvent, useContext } from "react"

export default function SearchPage() {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults
  } = useContext(GlobalContext)

  const getSearchResults = async (query: string) => {
    const res = await fetch(`/api/search?query=${query}`, {
      method: 'GET',
      cache: 'no-store'
    })

    const data = await res.json()

    if (data.success) {
      setSearchResults(data.data)
    }
  }

  const handleSearchPost = async () => {
    getSearchResults(searchQuery)
  }

  const handleDeletePost = async (id: number) => {
    const res = await fetch(`/api/blog/delete-post?id=${id}`, {
      method: 'DELETE',
      cache: 'no-store'
    })

    const data = await res.json()

    if (data && data.success) {
      getSearchResults(searchQuery)
    }
  }

  return (
    <>
      <section className="py-28 overflow-hidden">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mb-12 rounded-md bg-primary/[3%] py-11 px-8 dark:bg-dark sm:p-[50px] lg:mb-5 lg:px-8 xl:p-[55px]">
                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                  Search any blog post
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <input
                      name="search"
                      id="search"
                      type="text"
                      placeholder="Search Blog Post"
                      autoFocus
                      autoComplete="off"
                      value={searchQuery}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setSearchQuery(event.target.value)
                      }}
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242b51] dark:shadow-signUp"
                    />
                  </div>
                  <div>
                    <Button
                      text="Search"
                      onClick={handleSearchPost}
                    />
                  </div>
                </div>
              </div>
            </div>
            <section className="pt-[80px] w-full pb-[120px]">
              <div className="container">
                <div className="flex flex-wrap -mx-4">
                  {
                    searchResults && searchResults.length > 0 ?
                      searchResults.map((post: Blog) => {
                        return (
                          <div
                            key={post.id}
                            className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                          >
                            <Post
                              post={post}
                              handleDeletePost={handleDeletePost}
                            />
                          </div>
                        )
                      })
                      :
                      <div className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                        <h1>No search results</h1>
                      </div>
                  }
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}