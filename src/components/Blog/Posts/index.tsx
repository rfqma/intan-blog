'use client'

import { Blog } from "@/lib/utilities/types"
import { Post } from "../Post"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export const Posts = ({ posts }: { posts: Blog[] }) => {
  const router = useRouter()

  useEffect(() => {
    router.refresh()
  }, [router])

  const handleDeletePost = async (id: number) => {
    const res = await fetch(`/api/blog/delete-post?id=${id}`, {
      method: 'DELETE',
      cache: 'no-store'
    })

    const data = await res.json()

    if (data && data.success) {
      router.refresh()
    }
  }

  return (
    <>
      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-3 gap-10 lg:gap-2 -mx-4">
            {
              posts && posts.length > 0 ?
                posts.slice().reverse().sort().map((post: Blog) => {
                  return (
                    <div key={post.id} className="px-4">
                      <Post post={post} handleDeletePost={handleDeletePost} />
                    </div>
                  )
                })
                :
                null
            }
          </div>
        </div>
      </section>
    </>
  )
}