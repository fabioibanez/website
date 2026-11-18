import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

export type EntryKind = 'writings' | 'projects';

export type Entry = {
  slug: string;
  title: string;
  date: string | null;
  description: string | null;
  href: string | null;
  body: string;
  html: string;
};

const root = process.cwd();

function dirFor(kind: EntryKind) {
  return path.join(root, kind);
}

function slugsIn(kind: EntryKind): string[] {
  const dir = dirFor(kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.md') && !name.startsWith('.'))
    .map((name) => name.slice(0, -3));
}

export function hasEntries(kind: EntryKind) {
  return slugsIn(kind).length > 0;
}

function readFile(kind: EntryKind, slug: string) {
  if (!/^[a-zA-Z0-9._-]+$/.test(slug)) return null;
  const file = path.join(dirFor(kind), `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  const str = (value: unknown) =>
    typeof value === 'string' && value.trim() ? value.trim() : null;
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : str(data.date)?.slice(0, 10) ?? null;
  return {
    slug,
    title: str(data.title) ?? slug,
    date,
    description: str(data.description),
    href: str(data.href),
    body: content,
  };
}

export function listEntries(kind: EntryKind): Omit<Entry, 'html'>[] {
  return slugsIn(kind)
    .map((slug) => readFile(kind, slug))
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
    .sort((a, b) => {
      if (a.date && b.date) return b.date.localeCompare(a.date);
      if (a.date) return -1;
      if (b.date) return 1;
      return a.title.localeCompare(b.title);
    });
}

export function loadEntry(kind: EntryKind, slug: string): Entry | null {
  const entry = readFile(kind, slug);
  if (!entry) return null;
  return {
    ...entry,
    html: marked.parse(entry.body, { async: false }) as string,
  };
}
