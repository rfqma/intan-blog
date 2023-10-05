'use client'

import { Blog } from "@/lib/utilities/types"
import Link from "next/link"
import Image from 'next/image'
import { useSession } from "next-auth/react"
import { FaTrash } from 'react-icons/fa'
import './innerHTML.css'

export const Post = ({ post, handleDeletePost }: { post: Blog, handleDeletePost: (id: number) => {} }) => {
  const { image, title, summary, category, content, userImage, userId, id } = post
  const { data: session } = useSession()

  return (
    <>
      <div>
        <div className="relative overflow-hidden bg-white rounded-md shadow-one dark:bg-dark">
          <Link
            href={`/blog/${id}`}
            className="relative block h-[250px] w-full"
          >
            <span className="absolute z-20 inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white capitalize rounded-full top-6 right-6 bg-primary">
              {category}
            </span>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover object-center"
            />
          </Link>
        </div>
        <div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
          <h3>
            <Link
              href={`/blog/${id}`}
              className="block mb-4 overflow-hidden text-xl font-bold text-black text-ellipsis whitespace-nowrap hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            >
              {title}
            </Link>
          </h3>
          <p
            className="h-[20px] text-ellipsis overflow-hidden whitespace-nowrap mb-6 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10"
          >
            {summary}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="mr-4">
                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                  <Image
                    src={userImage}
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
                    {userId.split('_')[0]}
                  </p>
                </div>
                <div>
                  {
                    session !== null && session?.user?.name === userId ?
                      <FaTrash
                        className="cursor-pointer"
                        size={15}
                        onClick={() => handleDeletePost(id)}
                      />
                      :
                      null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}