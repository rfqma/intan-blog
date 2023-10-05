import { Category } from "@/components/Category"

const getPostsByCategory = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/category?categoryId=${id}`, {
    method: 'GET',
    cache: 'no-store'
  })

  const data = await res.json()

  if (data.success) {
    return data.data
  }
}

export default async function CategoryPage({ params }: { params: any }) {
  const { id } = params
  const postsByCategory = await getPostsByCategory(id)

  return (
    <>
      <div>
        <Category posts={postsByCategory} />
      </div>
    </>
  )
}