import { type NextRequest, NextResponse } from "next/server"

const WORDPRESS_GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL

export async function POST(request: NextRequest) {
  if (!WORDPRESS_GRAPHQL_URL) {
    return NextResponse.json({ error: "WordPress GraphQL URL not configured" }, { status: 500 })
  }

  try {
    const body = await request.json()

    const response = await fetch(WORDPRESS_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[GraphQL Proxy] Error:", error)
    return NextResponse.json({ error: "Failed to fetch from WordPress" }, { status: 500 })
  }
}
