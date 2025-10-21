import Link from 'next/link'
import { listPosts } from '@/lib/blog'

export const dynamic = 'force-static'

export default function BlogIndex() {
  const posts = listPosts()
  return (
    <main>
      <h1 className="text-3xl md:text-5xl font-extrabold mb-6">DYTOR Blog</h1>
      <p className="text-muted-foreground mb-10">Guides, case studies, and best practices for live production.</p>
      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="border-b pb-6">
            <Link href={`/blog/${p.slug}`} className="text-xl font-semibold hover:underline">
              {p.frontmatter.title || p.slug}
            </Link>
            <div className="text-sm text-gray-500 mt-1">
              {p.frontmatter.date ? new Date(p.frontmatter.date).toLocaleDateString() : '—'} · {p.readingTimeMinutes} min read
            </div>
            <p className="text-sm text-gray-400 mt-2 max-w-2xl">
              {p.frontmatter.description}
            </p>
          </li>
        ))}
      </ul>
    </main>
  )
}


