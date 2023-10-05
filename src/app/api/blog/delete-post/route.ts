export const dynamic = 'force-dynamic'

import prisma from "@/lib/databases/prisma"
import { NextRequest, NextResponse } from "next/server"

export const DELETE = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url)
    const getPostId = searchParams.get('id')

    const deletePost = await prisma.post.delete({
      where: {
        id: Number(getPostId)
      }
    })

    if (deletePost) {
      return NextResponse.json({
        success: true,
        message: 'Post deleted successfully!'
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to delete post!'
      })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      success: false,
      message: 'Something went wrong, please try again!'
    })
  }
}