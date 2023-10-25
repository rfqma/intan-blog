'use client'

import { Button } from "@/components/Button"
import { Blog } from "@/lib/utilities/types"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import './innerHTML.css'

export const PostDetails = ({ post }: { post: Blog }) => {
  const [comment, setComment] = useState<string>('')
  const { data: session } = useSession()
  const router = useRouter()

  const handleSendComment = async () => {
    let getComments = [...post.comments]

    getComments.push(`${comment}|${session?.user?.name}`)

    const res = await fetch(`/api/blog/update-post`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: post.id,
        comments: getComments
      })
    })

    const data = await res.json()

    if (data && data.success) {
      setComment('')
      router.refresh()
    }
  }

  useEffect(() => {
    let interval = setInterval(() => {
      router.refresh()
    }, 2000)
    return (
      () => {
        clearInterval(interval)
      }
    )
  })

  if (!post) {
    return null
  }


  return (
    <>
      <section className="pt-[150px] pb-[120px]">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-4 -mx-4">
            <div className="w-full px-8 lg:w-8/12">
              <div className="pb-20 border-b border-body-color border-opacity-10 dark:border-white dark:border-opacity-10">
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                  {post.title}
                </h2>
                <div className="flex flex-wrap items-center justify-between pb-4 mb-10 border-b border-body-color border-opacity-10 dark:border-white dark:border-opacity-10">
                  <div className="flex flex-wrap items-center">
                    <div className="flex items-center mr-10">
                      <div className="mr-4">
                        <div className="relative w-10 h-10 overflow-hidden rounded-full">
                          <Image
                            src={post.userImage}
                            alt={post.userId}
                            fill
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <h4 className="mb-1 text-base font-medium text-body-color">
                          Published at
                          <span className="pl-2">{post.createdAt.toString().split('T')[0]}</span>
                        </h4>
                        <h4 className="mb-1 text-base font-medium text-body-color">
                          By
                          <span className="pl-2">{post.userId.split('_')[0]}</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <Link
                      href={`/category/${post.category}`}
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-full bg-primary"
                    >
                      {post.category}
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="w-full mb-20 overflow-hidden rounded">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        src={post.image}
                        alt="Blog Post Image"
                        className="object-cover object-center"
                        fill
                      />
                    </div>
                  </div>
                  <p
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="mb-8 text-base font-normal leading-relaxed text-black dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full gap-4 lg:w-8/12 px-10">
              {
                session !== null ?
                  <>
                    <input
                      name="comment"
                      id="comment"
                      placeholder="Add comment here"
                      autoFocus
                      autoComplete="off"
                      value={comment}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setComment(event.target.value)
                      }}
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242b51] dark:shadow-signUp"
                    />
                    <Button
                      text="Send"
                      onClick={handleSendComment}
                    />
                  </>
                  :
                  null
              }
            </div>
            <section className="w-full py-8 dark:bg-gray-900 lg:py-10 lg:w-8/12 px-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-black lg:text-2xl dark:text-white">
                  Comments
                  ({
                    post.comments.length
                  })
                </h2>
              </div>
              {
                post && post.comments && post.comments.length > 0 ?
                  post.comments.map((comment) => {
                    return (
                      <>
                        <div className="p-6 text-base rounded-lg dark:bg-gray-900">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <p className="inline-flex items-center mr-3 text-sm font-semibold text-black dark:text-white">
                                {
                                  comment.split('|')[1] === post.userId ?
                                    `${comment.split('|')[1]} (Author)`
                                    :
                                    comment.split('|')[1]
                                }
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-500 dark:text-gray-400">
                            {comment.split('|')[0]}
                          </p>
                        </div>
                      </>
                    )
                  })
                  :
                  null
              }
            </section>
          </div>
        </div>
      </section>
    </>
  )
}