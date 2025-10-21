import { NextResponse } from 'next/server'
import { listPosts } from '@/lib/blog'

export const dynamic = 'force-static'

export async function GET() {
  const posts = listPosts()
  const urls = posts.map((p) => `  <url><loc>https://blog.dytor.app/${p.slug}</loc></url>`).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://blog.dytor.app/</loc></url>\n${urls}\n</urlset>`
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } })
}


