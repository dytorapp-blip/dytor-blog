import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET() {
  const content = `User-agent: *\nAllow: /\nSitemap: https://blog.dytor.app/sitemap.xml\n`
  return new NextResponse(content, { headers: { 'Content-Type': 'text/plain' } })
}


