import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings, { type Options as AutolinkOptions } from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  draft?: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { html: string };

function readRaw(slug: string) {
  const file = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), 'utf8');
  const { data, content } = matter(file);
  const words = content.split(/\s+/).filter(Boolean).length;
  const meta: PostMeta = {
    slug,
    title: String(data.title ?? slug),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ''),
    description: data.description,
    draft: Boolean(data.draft),
    readingMinutes: Math.max(1, Math.round(words / 230)),
  };
  return { meta, content };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

/** All published posts, newest first. Drafts show only in `next dev`. */
export function getAllPosts(): PostMeta[] {
  const showDrafts = process.env.NODE_ENV !== 'production';
  return getPostSlugs()
    .map((s) => readRaw(s).meta)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

const autolinkOptions: AutolinkOptions = {
  behavior: 'append',
  properties: { className: ['anchor'], ariaHidden: 'true', tabIndex: -1 },
  content: { type: 'text', value: '#' },
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm) // tables, footnotes, strikethrough, task lists, autolinks
  .use(remarkMath) // $inline$ and $$block$$ math
  .use(remarkRehype)
  .use(rehypeSlug) // id="..." on headings
  .use(rehypeAutolinkHeadings, autolinkOptions)
  .use(rehypeKatex)
  .use(rehypePrettyCode, {
    theme: 'vesper', // Shiki theme, highlighted at build time (zero client JS)
    keepBackground: false,
  })
  .use(rehypeStringify);

export async function getPost(slug: string): Promise<Post> {
  const { meta, content } = readRaw(slug);
  const html = String(await processor.process(content));
  return { ...meta, html };
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
