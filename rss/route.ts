import { NextResponse } from 'next/server'
import RSS from 'rss'
import { listPosts } from '@/lib/blog'

export const dynamic = 'force-static'

export async function GET() {
  const feed = new RSS({
    title: 'DYTOR Blog',
    site_url: 'https://blog.dytor.app',
    feed_url: 'https://blog.dytor.app/rss',
    description: 'Insights on professional show control, timing, and production.',
  })
  const posts = listPosts()
  posts.forEach((p) => {
    const item: any = {
      title: p.frontmatter.title || p.slug,
      url: `https://blog.dytor.app/${p.slug}`,
      description: p.frontmatter.description,
    }
    if (p.frontmatter.date) item.date = new Date(p.frontmatter.date)
    feed.item(item)
  })
  return new NextResponse(feed.xml({ indent: true }), { headers: { 'Content-Type': 'application/rss+xml' } })
}


