import { PostDetails } from "@/components/Blog/PostDetails"

interface Param {
  id: string
}

const getPostDetails = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/detail-post?id=${id}`, {
    method: 'GET',
    next: {
      revalidate: 0
    }
  })

  const data = await res.json()

  if (data.success) {
    return data.data
  }
}

export default async function PostDetailsPage({ params }: { params: any }) {
  const { id } = params
  const postDetails = await getPostDetails(id)

  return (
    <>
      <PostDetails post={postDetails} />
    </>
  )
}