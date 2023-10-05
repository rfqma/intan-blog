import prisma from "@/lib/databases/prisma"
import { NextRequest, NextResponse } from "next/server"

export const PUT = async (request: NextRequest) => {
  try {
    const getPostData = await request.json()

    const updatePost = await prisma.post.update({
      where: {
        id: Number(getPostData.id)
      },
      data: {
        comments: getPostData.comments
      }
    })

    if (updatePost) {
      return NextResponse.json({
        success: true,
        message: 'Blog post updated successfully!'
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to update post!'
      })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
      message: 'Something went wrong, please try again!'
    })
  }
}