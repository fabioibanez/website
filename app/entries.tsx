import Link from 'next/link';
import type { EntryKind } from '../lib/content';
import { listEntries, loadEntry } from '../lib/content';
import { notFound } from 'next/navigation';

export function EntryIndex({
  kind,
  base,
}: {
  kind: EntryKind;
  base: string;
}) {
  const entries = listEntries(kind);
  return (
    <ul className="index">
      {entries.map((entry) => {
        const desc = entry.description ?? entry.date ?? '';
        const inner = (
          <>
            <span className="name">{entry.title}</span>
            {desc ? <span className="desc">{desc}</span> : null}
          </>
        );
        const external = Boolean(entry.href) && !entry.body.trim();
        return (
          <li key={entry.slug}>
            {external ? (
              <a href={entry.href!}>{inner}</a>
            ) : (
              <Link href={`${base}/${entry.slug}`}>{inner}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function EntryPage({
  kind,
  slug,
}: {
  kind: EntryKind;
  slug: string;
}) {
  const entry = loadEntry(kind, slug);
  if (!entry) notFound();

  return (
    <article className="entry">
      <header className="entry-header">
        <h1>{entry.title}</h1>
        {entry.date || entry.href ? (
          <p className="entry-meta">
            {entry.date}
            {entry.date && entry.href ? ' · ' : null}
            {entry.href ? (
              <a href={entry.href}>{entry.href.replace(/^https?:\/\//, '')}</a>
            ) : null}
          </p>
        ) : null}
      </header>
      <div
        className="entry-body"
        dangerouslySetInnerHTML={{ __html: entry.html }}
      />
    </article>
  );
}
