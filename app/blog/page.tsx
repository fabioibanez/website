import type { Metadata } from 'next';
import { formatDate, getAllPosts } from '../../lib/posts';

export const metadata: Metadata = { title: 'Writing' };

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <section className="blog">
      <h1 className="page-title">Writing</h1>
      {posts.length === 0 && <p className="post-meta">Nothing published yet.</p>}
      <ul className="post-list">
        {posts.map((p) => (
          <li key={p.slug}>
            <a href={`/blog/${p.slug}`}>
              <span className="post-list-title">{p.title}</span>
              <time dateTime={p.date}>{formatDate(p.date)}</time>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
