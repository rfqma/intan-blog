import { Posts } from "@/components/Blog/Posts"

const getPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/get-posts`, {
    method: 'GET',
    cache: 'no-store'
  })

  const data = await res.text()

  if (data) {
    const dataJSON = JSON.parse(data)
    if (dataJSON.success) {
      return dataJSON.data
    }
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <>
      <Posts posts={posts} />
    </>
  )
}