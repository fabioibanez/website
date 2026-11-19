import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import 'katex/dist/katex.min.css';
import { formatDate, getAllPosts, getPost } from '../../../lib/posts';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

// Static export errors on an empty list, so emit a placeholder that 404s
// while there are no published posts yet.
const PLACEHOLDER = '_';

export function generateStaticParams() {
  const slugs = getAllPosts().map((p) => ({ slug: p.slug }));
  return slugs.length ? slugs : [{ slug: PLACEHOLDER }];
}

function isPublished(slug: string) {
  return getAllPosts().some((p) => p.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isPublished(slug)) return {};
  const post = await getPost(slug);
  return { title: post.title, description: post.description };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  if (!isPublished(slug)) notFound();
  const post = await getPost(slug);
  return (
    <article className="blog">
      <header className="post-header">
        <h1>{post.title}</h1>
        <p className="post-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden> · </span>
          {post.readingMinutes} min read
          {post.draft && <span className="draft-badge">draft</span>}
        </p>
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      <p className="post-back">
        <a href="/blog">← All writing</a>
      </p>
    </article>
  );
}
