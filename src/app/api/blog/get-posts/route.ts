export const dynamic = 'force-dynamic'

import prisma from "@/lib/databases/prisma"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
  try {
    const getPosts = await prisma.post.findMany()

    if (getPosts && getPosts.length) {
      return NextResponse.json({
        success: true,
        data: getPosts
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to get blog posts!'
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