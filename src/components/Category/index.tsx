'use client'

import { Blog } from "@/lib/utilities/types"
import { Button } from "../Button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { categoryOptions } from "@/lib/utilities/data"
import Link from "next/link"
import './innerHTML.css'

export const Category = ({ posts }: { posts: Blog[] }) => {
  const router = useRouter()

  const getLatestPostId = Math.max(...posts.map((post) => post.id))

  const getRecentPostByCategory = (
    posts && posts.length > 0 ?
      posts.find((post) => post.id === getLatestPostId)
      :
      null
  )

  const getPostsByCategory = (
    posts && posts.length > 0 ?
      posts.filter((post) => post.id !== getLatestPostId)
      :
      []
  )

  return (
    <>
      <section className="overflow-hidden pt-[150px] lg:pt-[180px] pb-[120px] ">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-10 lg:mb-0 lg:w-8/12">
              {
                getRecentPostByCategory === null ?
                  <div className="flex flex-col gap-4">
                    <h2
                      className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl"
                    >
                      No blog post yet in this category!
                    </h2>
                    <Button
                      text="Create Post"
                      onClick={() => router.push('/create')}
                    />
                  </div>
                  :
                  <div>
                    <h2
                      className="mb-8 text-3xl font-bold leading-tight text-body-color sm:text-4xl"
                    >
                      Latest Blog Post
                    </h2>
                    <Link href={`/blog/${getRecentPostByCategory?.id}`}>
                      <h2
                        className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl hover:text-primary dark:hover:text-primary"
                      >
                        {getRecentPostByCategory?.title}
                      </h2>
                      <div className="w-full mb-6 overflow-hidden rounded">
                        <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                          <Image
                            src={getRecentPostByCategory?.image || ''}
                            alt="Blog Post Image"
                            fill
                            className="object-cover object-center w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
                          <div className="mr-4">
                            <div className="relative w-10 h-10 overflow-hidden rounded-full">
                              <Image
                                src={getRecentPostByCategory!.userImage}
                                alt="Author"
                                fill
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex flex-col">
                              <p className="mb-1 text-sm font-medium text-dark dark:text-white">
                                By
                              </p>
                              <p className="mb-1 text-sm font-medium text-dark dark:text-white">
                                {getRecentPostByCategory?.userId.split('_')[0]}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p
                        dangerouslySetInnerHTML={{ __html: getRecentPostByCategory?.summary! }}
                        className="h-[40px] leading-relaxed text-ellipsis overflow-hidden whitespace-nowrap mb-8 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg"
                      />
                    </Link>
                  </div>
              }
            </div>
            <div className="w-full px-4 lg:w-4/12">
              <div className="mb-10 rounded-md bg-primary bg-opacity-5 dark:bg-opacity-10">
                <h3 className="px-8 py-4 text-lg font-semibold text-black border-b border-body-color border-opacity-10 dark:border-white dark:border-opacity-10 dark:text-white">
                  Filter by Category
                </h3>
                <div className="flex flex-wrap px-8 py-6">
                  {
                    categoryOptions.map((categoryOption) => {
                      return (
                        <>
                          <button
                            onClick={() => router.push(`/category/${categoryOption.value}`)}
                            className="inline-flex items-center justify-center px-4 py-2 mb-3 mr-3 text-white duration-300 rounded-md bg-primary"
                          >
                            {categoryOption.label}
                          </button>
                        </>
                      )
                    })
                  }
                </div>
              </div>
              <div className="mb-10 rounded-md bg-primary bg-opacity-5 dark:bg-opacity-10">
                <h3 className="px-8 py-4 text-lg font-semibold text-black border-b border-body-color border-opacity-10 dark:border-white dark:border-opacity-10 dark:text-white">
                  Related Blog Posts
                </h3>
                <ul className="p-8">
                  {
                    getPostsByCategory && getPostsByCategory.length > 0 ?
                      getPostsByCategory.map((post) => {
                        return (
                          <>
                            <li
                              key={post.id}
                              className="pb-6 mb-6 border-b border-body-color border-opacity-10 dark:border-white dark:border-opacity-10"
                            >
                              <Link href={`/blog/${getRecentPostByCategory?.id}`}>
                                <div className="flex items-center lg:block xl:flex">
                                  <div className="mr-5 lg:mb-3 xl:mb-0">
                                    <div className="relative h-[60px] w-[70px] overflow-hidden rounded-md sm:h-[75px] sm:w-[85px]">
                                      <Image
                                        src={post.image}
                                        alt="Blog Post Image"
                                        fill
                                        className="object-cover object-center"
                                      />
                                    </div>
                                  </div>
                                  <div className="w-full">
                                    <h5>
                                      <Link
                                        href={`/blog/${post.id}`}
                                        className="mb-[8px] block text-base font-medium text-black dark:text-white hover:text-primary dark:hover:text-primary"
                                      >
                                        {post.title}
                                      </Link>
                                    </h5>
                                    <p className="mb-1 text-xs font-medium text-body-color">
                                      By {getRecentPostByCategory?.userId.split('_')[0]}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          </>
                        )
                      })
                      :
                      <h2>No related blog posts available</h2>
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}