export const dynamic = 'force-dynamic'

import prisma from "@/lib/databases/prisma"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url)
    const getPostId = searchParams.get('id')

    const detailPost = await prisma.post.findUnique({
      where: {
        id: Number(getPostId)
      }
    })

    if (detailPost) {
      return NextResponse.json({
        success: true,
        data: detailPost
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to fetch post!'
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