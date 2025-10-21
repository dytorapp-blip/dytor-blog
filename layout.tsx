export const metadata = {
  title: 'Blog — DYTOR',
  description: 'Insights on professional show control, timing, and production.',
  alternates: { canonical: 'https://blog.dytor.app' },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-10">
      {children}
    </section>
  )
}


