import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import Image from 'next/image'
import Link from 'next/link'
import { generateAutoDescription, generateAutoTags, getAllPostSlugs, readPostBySlug } from '@/lib/blog'

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = readPostBySlug(params.slug)
  if (!post) return {}
  const description = post.frontmatter.description || generateAutoDescription(post.content)
  const title = post.frontmatter.title || params.slug
  const url = `https://blog.dytor.app/${params.slug}`
  const image = post.frontmatter.image || '/assets/Dytor_logo_name.png'
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [image], type: 'article' },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

const components = {
  img: (props: any) => {
    const { src = '', alt = '', width = 1200, height = 630 } = props
    return <Image src={src} alt={alt} width={Number(width)} height={Number(height)} loading="lazy" />
  },
  a: (props: any) => <Link {...props} />,
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = readPostBySlug(params.slug)
  if (!post) return notFound()
  const description = post.frontmatter.description || generateAutoDescription(post.content)
  const tags = post.frontmatter.tags || generateAutoTags(post.content)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.frontmatter.title || params.slug,
    datePublished: post.frontmatter.date,
    author: post.frontmatter.author || 'DYTOR Team',
    image: post.frontmatter.image ? [post.frontmatter.image] : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://blog.dytor.app/${params.slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DYTOR',
      url: 'https://dytor.app',
    },
    description,
  }

  return (
    <article className="prose prose-invert max-w-none">
      <h1>{post.frontmatter.title || params.slug}</h1>
      <p className="text-sm text-gray-500">{post.frontmatter.date ? new Date(post.frontmatter.date).toLocaleDateString() : ''} · {post.readingTimeMinutes} min read</p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MDXRemote source={post.content} components={components as any} options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings] } }} />
      {tags.length > 0 && (
        <div className="mt-8 text-sm">
          <span className="mr-2 text-gray-500">Tags:</span>
          {tags.map((t) => (
            <span key={t} className="mr-2 inline-block rounded border px-2 py-0.5 text-gray-400">{t}</span>
          ))}
        </div>
      )}
      <hr className="my-8" />
      <p className="text-sm text-gray-400">
        Continue exploring DYTOR: <Link href="https://dytor.app/features" className="underline">Features</Link> · <Link href="https://dytor.app/pricing" className="underline">Pricing</Link> · <Link href="https://dytor.app/docs" className="underline">Docs</Link>
      </p>
    </article>
  )
}


