export const dynamic = 'force-dynamic'

import prisma from "@/lib/databases/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url)
    const getCategoryId = searchParams.get('categoryId')

    const getPostsFromCategoryId = await prisma.post.findMany({
      where: {
        category: getCategoryId || ''
      }
    })

    if (getPostsFromCategoryId) {
      return NextResponse.json({
        success: true,
        data: getPostsFromCategoryId
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to fetch data!'
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