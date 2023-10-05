export const dynamic = 'force-dynamic'

import prisma from "@/lib/databases/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url)
    const getQuery = searchParams.get('query')

    const getPostsFromQuery = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: getQuery || ''
            }
          },
          {
            summary: {
              contains: getQuery || ''
            }
          },
          {
            content: {
              contains: getQuery || ''
            }
          }
        ]
      }
    })

    if (getPostsFromQuery) {
      return NextResponse.json({
        success: true,
        data: getPostsFromQuery
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to search posts!'
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